import crypto from "node:crypto";
import {
    createSession,
    getSession,
    updateSession,
    pruneExpiredSessions,
} from "./session/store.js";

const escapeHtml = (value = "") =>
    String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

const field = (opts = {}) => ({
    type: "object",
    properties: { value: { type: "string", ...opts } },
    required: ["value"],
});

const messageBodySchema = {
    body: {
        type: "object",
        required: ["name", "subname", "email", "topic", "message"],
        properties: {
            name:    field({ minLength: 2, maxLength: 30 }),
            subname: field({ minLength: 2, maxLength: 30 }),
            email:   field({ minLength: 5, maxLength: 50, format: "email" }),
            topic:   field({ minLength: 1 }),
            country: { type: "object", properties: { value: { type: "string", maxLength: 50 } } },
            message: field({ minLength: 10, maxLength: 5000 }),
        },
    },
};

export default async function register(fastify) {
    const bot = fastify.bot;
    const chatId = fastify.config.TELEGRAM_CHAT_ID;

    fastify.post("/api/message", { schema: messageBodySchema }, async (request, reply) => {
        const fields = request.body;

        const sessionId = crypto.randomUUID();

        const message =
            `📨 <b>Новая заявка</b>\n\n` +
            `👤 <b>Имя:</b> <code>${escapeHtml(fields.name?.value)}</code>\n` +
            (fields.subname?.value
                ? `👤 <b>Фамилия:</b> <code>${escapeHtml(fields.subname.value)}</code>\n`
                : "") +
            `📧 <b>Email:</b> <code>${escapeHtml(fields.email?.value)}</code>\n` +
            `🏙️ <b>Город:</b> <code>${escapeHtml(fields.country?.value)}</code>\n` +
            `📌 <b>Тема:</b> <code>${escapeHtml(fields.topic?.value)}</code>\n\n` +
            `💬 <b>Сообщение:</b>\n` +
            `<blockquote>${escapeHtml(fields.message?.value)}</blockquote>`;

        let telegramMessage;
        try {
            telegramMessage = await bot.telegram.sendMessage(
                chatId,
                message,
                {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [[
                            {
                                text: "✅ Принять",
                                callback_data: `accept_${sessionId}`,
                            },
                            {
                                text: "❌ Отклонить",
                                callback_data: `reject_${sessionId}`,
                            },
                        ]],
                    },
                }
            );
        } catch (error) {
            fastify.log.error({ err: error }, "Failed to send Telegram notification");
            return reply.code(502).send({
                success: false,
                error: "Failed to deliver message to Telegram",
            });
        }

        createSession(sessionId, {
            id: sessionId,
            name: fields.name?.value ?? "",
            subname: fields.subname?.value ?? "",
            email: fields.email?.value ?? "",
            country: fields.country?.value ?? "",
            topic: fields.topic?.value ?? "",
            message: fields.message?.value ?? "",
            status: "pending",
            messageId: telegramMessage.message_id,
            createdAt: Date.now(),
        });

        return reply.send({
            success: true,
            sessionId,
        });
    });

    bot.action(/^accept_(.+)$/, async (ctx) => {
        const sessionId = ctx.match[1];

        const session = getSession(sessionId);

        if (!session) {
            return ctx.answerCbQuery("Сессия не найдена");
        }

        updateSession(sessionId, {
            status: "accepted",
        });

        await ctx.answerCbQuery("Заявка принята");

        await ctx.editMessageReplyMarkup({
            inline_keyboard: [],
        });

        await ctx.reply(
            `✅ Заявка от ${session.name} принята`
        );
    });

    bot.action(/^reject_(.+)$/, async (ctx) => {
        const sessionId = ctx.match[1];

        const session = getSession(sessionId);

        if (!session) {
            return ctx.answerCbQuery("Сессия не найдена");
        }

        updateSession(sessionId, {
            status: "rejected",
        });

        await ctx.answerCbQuery("Заявка отклонена");

        await ctx.editMessageReplyMarkup({
            inline_keyboard: [],
        });

        await ctx.reply(
            `❌ Заявка от ${session.name} отклонена`
        );
    });

    fastify.get("/health", async () => {
        return {
            status: "ok",
        };
    });

    const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
    const cleanupInterval = setInterval(() => {
        const removed = pruneExpiredSessions(SESSION_TTL_MS);
        if (removed > 0) fastify.log.info({ removed }, "Pruned expired sessions");
    }, 24 * 60 * 60 * 1000);
    cleanupInterval.unref();
}