import fastify from 'fastify';
import { factory } from '@/factory';


export const app = fastify({ logger: true });

async function start() {
  try {
    await factory(app);
    app.listen({ port: process.env.PORT, host: '0.0.0.0' });
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
}

start();
