import { factory } from '@/factory.js';
import fastify from 'fastify';

const app = fastify({ logger: true });
process.on('SIGTERM', onShutDown);
process.on('SIGINT', onShutDown);

main();

async function main() {
  try {
    await factory(app);
    app.listen({ port: process.env.PORT, host: process.env.HOST });
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
}

async function onShutDown() {
  await app.close();
  process.exit(0);
}
