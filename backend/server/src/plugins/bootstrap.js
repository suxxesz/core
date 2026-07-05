import fastifyCors from '@fastify/cors'
import applicationsRouter from '../routes/application.js'
import { client, lastSeenMap } from '../discord/bot.js'

/**
 * Плагин начальной загрузки бэкенда
 * @param {import('fastify').FastifyInstance} fastify 
 * @param {Object} opts 
 */
async function addBootstrap(fastify, opts) {
  await fastify.register(fastifyCors, {
    origin: process.env.FRONTEND_ORIGIN ?? true,
  })
  
  await fastify.register(applicationsRouter, { prefix: '/applications' })

  fastify.get('/users/:id', async (request, reply) => {
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