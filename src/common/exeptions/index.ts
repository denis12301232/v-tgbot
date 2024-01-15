import type { FastifyInstance, FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import { GrammyError } from 'grammy';

export default function handler(
  this: FastifyInstance,
  e: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  this.log.error({ name: e.name, code: e.code, status: e.statusCode }, e.message);
  if (e instanceof GrammyError) {
    return reply.status(400).send({ name: e.name, message: e.message });
  } else {
    return reply.status(500).send(e);
  }
}
