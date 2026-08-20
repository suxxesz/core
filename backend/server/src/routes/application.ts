import db from '../../db.ts'
import type { FastifyInstance }  from 'fastify'
import type { FastifyRequest } from 'fastify'
import type { DiscordUser } from '../../shared/types/discord.types.ts'

async function applicationRouter(fastify : FastifyInstance, opts : any) {
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
  fastify.setErrorHandler( async function customErrorHandler(error , request , reply) {
    request.log.error(error, 'an error happened in Fastify Instance!');
    reply.status(503).send({ ok: false });
  })

  fastify.post<{
    Params: {
      id: string
    },
    Body: Pick<DiscordUser , 'discord_id'> & { name: string; email: string; message: string
    },
  }>('/', {
    schema: postSchema ,
    errorHandler : async function (error , request , reply) {
      const catchedError = request.log.error(error , 'error occured while posting data! ')
      return  {success : false , status : 403}
    } ,
  }  , async (request : FastifyRequest & { body: Pick<DiscordUser , 'discord_id'> & { name: string; email: string; message: string } }, reply : any) => {
      const {discord_id, name, email, message } = request.body
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
  })
  //Кастомный обработчик ошибки маршрута!
  fastify.get('/', {
    errorHandler : async function (error , request , reply) {
      const catchedError = request.log.error(error , 'error occured while getting data! ')
      return  {success : false , status :403 , catchedError}
    }
  } 
  , async (_request : FastifyRequest, reply) => {
      const rows = db.prepare('SELECT * FROM applications ORDER BY created_at DESC').all()
      return rows 
  })

  fastify.patch<
  Request & { Params: { id: string }; Body: { status: 'pending' | 'approved' | 'rejected' } }
  >('/:id/status', 
    {
    schema :  patchSchema , 
    errorHandler : async function (error , request , reply) {
      const catchedError = request.log.error(error , 'error occured while getting data! ')
      return  {success : false , status : 403 , catchedError}
    }
  } 
    , async (request : FastifyRequest & { params: { id: string }; body: { status: 'pending' | 'approved' | 'rejected' } }, reply) => {
      const { id } = request.params
      const { status } = request.body
      const stmt = db.prepare('UPDATE applications SET status = ? WHERE id = ?')
      const result = stmt.run(status, id)

      if (result.changes === 0) {
        throw new Error('Application not found')
      }
      return {
        id: Number(id), 
        status,
        message: 'Статус обновлен!'
      }
  })
}

export default applicationRouter
