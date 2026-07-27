import { Telegraf } from 'telegraf';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import fastifyEnv from '@fastify/env';
import { Type } from '@sinclair/typebox';
import register from './core/register.ts';
import type { config } from '../../env';


const app : FastifyInstance & Partial<config> = Fastify({
  logger: true
});

await app.register(fastifyEnv, {
  dotenv: true,
  schema: {
    type: 'object',
    properties: {
      BOT_PORT: Type.Number({ default: 3001 }),
      TELEGRAM_BOT_TOKEN: Type.String()
    }
  },
});

const bot = new Telegraf(app.config.TELEGRAM_BOT_TOKEN);

app.decorate('bot', bot);

await register(app);

bot.start(async (ctx) => {
  await ctx.reply('🤖 Бот запущен');
});

await bot.launch();

await app.listen({
  port: app.config.BOT_PORT,
  host: '0.0.0.0'
});