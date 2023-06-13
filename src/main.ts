import { factory } from '@/factory.js';
import fastify from 'fastify';

const app = fastify({ logger: true });

async function main() {
  try {
    await factory(app);
    app.listen({ port: process.env.PORT, host: process.env.HOST });
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
}

main();
