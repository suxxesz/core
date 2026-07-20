import { Telegraf } from "telegraf";
import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyCors from "@fastify/cors";
import { Type } from "@sinclair/typebox";
import { fileURLToPath } from "node:url";
import path from "node:path";
import register from "./src/register.js";

// ВАЖНО: раньше здесь был path.resolve('../../.env'), который резолвится
// относительно process.cwd() (откуда запущен `node`), а не относительно
// расположения этого файла. Если запускать `node server/bot/start.js`
// из папки backend/ (естественное место, там же package.json и node_modules),
// такой путь уводит на два уровня выше самого проекта и .env не находится.
// fileURLToPath(import.meta.url) всегда указывает на реальное расположение
// файла, поэтому путь ниже не зависит от того, откуда процесс запущен.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.resolve(__dirname, "../../.env"); // backend/server/bot -> backend/.env

const app = Fastify({
  logger: {
    level: "debug",
    transport: {
      target: "pino-pretty",
    },
  }
});

async function start() {
  await app.register(fastifyEnv, {
    dotenv: { path: ENV_PATH },
    schema: {
      type: "object",
      // required[] — без этого @fastify/env молча регистрирует конфиг
      // даже при отсутствующих переменных, и process.env.TELEGRAM_BOT_TOKEN
      // оказывается undefined только в момент реального обращения к Telegram.
      required: ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"],
      properties: {
        BOT_PORT: Type.Number({ default: 3001 }),
        TELEGRAM_BOT_TOKEN: Type.String(),
        TELEGRAM_CHAT_ID: Type.String(),
      },
    },
  });

  app.decorate("chatId", app.config.TELEGRAM_CHAT_ID);

  const bot = new Telegraf(app.config.TELEGRAM_BOT_TOKEN);
  app.decorate("bot", bot);

  await app.register(fastifyCors, {
    origin: process.env.FRONTEND_ORIGIN ?? true,
  });

  await register(app);

  bot.start(async (ctx) => {
    await ctx.reply("🤖 Бот запущен");
  });
  await app.listen({
    port: app.config.BOT_PORT,
    host: "0.0.0.0",
  });

  try {
    await bot.launch();
  } catch (error) {
    app.log.error(
      { err: error },
      "Telegram bot failed to launch — HTTP API is still up, but /api/message won't be able to notify Telegram until this is fixed",
    );
  }
}

start().then(
  app.log.info( "Bot service started")
).catch((error) => {
  app.log.error({ err: error }, "Bot service failed to start");
  process.exit(1);
});

const shutdown = async (signal) => {
  app.log.info({ signal }, "Shutting down bot service");
  app.bot?.stop(signal);
  await app.close();
  process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));