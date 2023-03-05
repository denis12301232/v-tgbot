import type { FastifyInstance } from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import { join } from 'path';


export async function factory(fastify: FastifyInstance) {
   await fastify.register(import('@fastify/env'), {
      schema: { type: 'object' },
      dotenv: { path: `.env`, debug: true }
   });
   fastify.register(fastifyAutoload, { dir: join(__dirname, 'plugins') });
   await fastify.ready();
}