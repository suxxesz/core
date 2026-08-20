import '@fastify/env'
import { Telegraf } from 'telegraf'

export interface config {
  TOKEN: string
  PORT: number
  GUILD_ID: string
  TELEGRAM_CHAT_ID : string
  TELEGRAM_BOT_TOKEN : string
}

declare module 'fastify' {
  interface FastifyInstance {
    config: config
    bot : Telegraf
  }
}
