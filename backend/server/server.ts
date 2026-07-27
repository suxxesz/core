import Fastify, { FastifyInstance } from 'fastify'
import fastifyEnv from '@fastify/env'
import { client } from './src/discord/bot.ts' 
import addBootstrap from './src/plugins/bootstrap.ts' 
import { Type } from '@sinclair/typebox'
import type { config } from '../env.d.ts'

const serverOptions = {
  logger: {
    level: 'debug',
    transport: {
      target: 'pino-pretty',
    }
  }
}

const app : FastifyInstance & Partial<config> = Fastify(serverOptions)

const schema = Type.Object({
  TOKEN: Type.String(),
  PORT: Type.Number({ default: 3000 }),
  GUILD_ID: Type.String(),
})

await app.register(fastifyEnv, {
  schema: schema,
  dotenv: true,
  data: process.env
})

async function start() {
  try {
    await app.register(addBootstrap)
    
    await app.ready()

    await app.listen({ port: app.config.PORT, host: '0.0.0.0' })
    await client.login(app.config.TOKEN)

  } catch (error) {
    app.log.error(error, 'Startup error!')
    process.exit(1)
  }
}

start()
