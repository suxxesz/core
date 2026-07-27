// src/plugins/bootstrap.ts
import fastifyCors from '@fastify/cors'
import applicationsRouter from '../routes/application.ts'
import { client, lastSeenMap } from '../discord/bot.ts'
import type { FastifyInstance } from 'fastify'
import type { FastifyRequest } from 'fastify'

/**
 * Плагин начальной загрузки бэкенда
 * @param {import('fastify').FastifyInstance} fastify 
 * @param {Object} opts 
 */
async function addBootstrap(fastify: FastifyInstance & { config: { GUILD_ID: string } }, opts: any) {
  await fastify.register(fastifyCors)

  await fastify.register(applicationsRouter, { prefix: '/applications' })

  fastify.get<{
    Params: {
    id: string
  }
  }>('/users/:id', async (request: Pick<FastifyRequest, 'params'> & { params: { id: string } }, reply: {
    code: (code: number) => { send: (body: any) => void }
  }
  ) => {
    try {
      const guild = client.guilds.cache.get(fastify.config.GUILD_ID)
      if (!guild) return reply.code(500).send({ error: 'Guild not found' })

      const member = await guild.members.fetch(request.params.id).catch(() => null)
      if (!member) return reply.code(404).send({ error: 'User not found on server' })

      const user = member.user

      return {
        id: user.id,
        username: user.username,
        globalName: user.globalName,
        avatar: user.displayAvatarURL({ size: 512 }),
        status: member.presence?.status || 'offline',
        lastSeen: lastSeenMap.get(user.id) || null,
      }
    } catch (error) {
      fastify.log.error(error, 'occurred while getting data')
      return reply.code(500).send({ error: 'Internal server error' })
    }
  })
}

export default addBootstrap
