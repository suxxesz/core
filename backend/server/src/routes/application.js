import db from '../../db.js'

async function applicationRouter(fastify, opts) {
  const postSchema = {
    body: {
      type: 'object',
      required: ['name', 'email', 'message'],
      properties: {
        discord_id: { type: ['string', 'null'], minLength: 2 },
        name: { type: 'string', minLength: 1 },
        email: { type: 'string', format: 'email' },
        message: { type: 'string', minLength: 1 }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          message: { type: 'string' }
        }
      }
    }
  }

  const patchSchema = {
    params: {
      type: 'object',
      required: ['id'],
      properties: { id: { type: 'integer' } }
    },
    body: {
      type: 'object',
      required: ['status'],
      properties: { status: { type: 'string', enum: ['pending', 'approved', 'rejected'] } }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          status: { type: 'string' },
          message: { type: 'string' }
        }
      }
    }
  }

  fastify.post('/', { schema: postSchema }, async (request, reply) => {
    try {
      const { discord_id, name, email, message } = request.body
      const stmt = db.prepare(`
        INSERT INTO applications (discord_id, name, email, message)
        VALUES (@discord_id, @name, @email, @message)
      `)
      const result = stmt.run({
        discord_id: discord_id?.trim() || null,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim()
      })
      return reply.code(201).send({
        id: Number(result.lastInsertRowid),
        message: 'Заявка принята',
      })
    } catch (error) {
      fastify.log.error(error)
      return reply.code(500).send({ error: 'Внутренняя ошибка сервера' })
    }
  })

  fastify.get('/', async (request, reply) => {
    try {
      const rows = db.prepare('SELECT * FROM applications ORDER BY created_at DESC').all()
      return rows 
    } catch (error) {
      fastify.log.error(error)
      return reply.code(500).send({ error: 'Не удалось получить данные' })
    }
  })

  fastify.patch('/:id/status', { schema: patchSchema }, async (request, reply) => {
    try {
      const { id } = request.params
      const { status } = request.body
      const stmt = db.prepare('UPDATE applications SET status = ? WHERE id = ?')
      const result = stmt.run(status, id)

      if (result.changes === 0) {
        return reply.code(404).send({ error: 'Cant find order with this ID!' })
      }
      return {
        id: Number(id), 
        status,
        message: 'Статус обновлен!'
      }
    } catch (error) {
      fastify.log.error(error, 'occurred while patching datum!')
      return reply.code(500).send({ error: 'Не удалось получить данные' })
    }
  })
}

export default applicationRouter
