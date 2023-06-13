import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { GrammyError } from 'grammy';
import Joi from 'joi';

export default function apiErrorHandler(this: FastifyInstance, e: Error, request: FastifyRequest, reply: FastifyReply) {
  this.log.error({ name: e.name, msg: e.message });
  if (e instanceof GrammyError) {
    return reply.status(400).send({ message: e.message, errors: [e.description] });
  } else if (e instanceof Joi.ValidationError) {
    return reply.status(403).send({ message: e.message, errors: e.details });
  } else {
    return reply.status(500).send(e.message);
  }
}
