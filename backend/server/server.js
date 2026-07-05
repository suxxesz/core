  import Fastify from 'fastify'
  import fastifyEnv from '@fastify/env'
  import { client } from './src/discord/bot.js'
  import addBootstrap from './src/plugins/bootstrap.js'
  import { Type } from '@sinclair/typebox'
  import { fileURLToPath } from 'node:url'
  import path from 'node:path'

// dotenv: true раньше искал .env через process.cwd() — работает, пока
// сервис всегда стартуют через `npm start` (npm сам ставит CWD в корень
// пакета). Абсолютный путь ниже не зависит от того, как именно запущен
// процесс — та же защита, что и в server/bot/start.js.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ENV_PATH = path.resolve(__dirname, '../.env')

const serverOptions = {
  logger: {
    level: 'debug',
    transport: {
      target: 'pino-pretty',
    }
  }
}

const app = Fastify(serverOptions)

const schema = Type.Object({
  TOKEN: Type.String(),
  PORT: Type.Number({ default: 3000 }),
  GUILD_ID: Type.String(),
})

await app.register(fastifyEnv, {
  schema: schema,
  dotenv: { path: ENV_PATH },
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

const shutdown = async (signal) => {
  app.log.info({ signal }, 'Shutting down main service')
  client.destroy()
  await app.close()
  process.exit(0)
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))