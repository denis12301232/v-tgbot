import type { FastifyInstance } from 'fastify';
import type { ObjectSchema } from 'joi';
import fastifyEnv from '@fastify/env';
import Plugins from './plugins/Plugins.js';
import botRoutes from '@/routes/bot.js';
import apiErrorHandler from '@/exceptions/apiErrorHandler.js';

export async function factory(app: FastifyInstance) {
  await app.register(fastifyEnv, {
    schema: { type: 'object' },
    dotenv: { path: `.env`, debug: true },
  });
  app.register(Plugins.botInit);
  process.argv.includes('-w')
    ? app.register(Plugins.botWebhook, { endpoint: '/bot' })
    : app.register(Plugins.botPolling);
  app.register(botRoutes, { prefix: '/bot' });
  app.setValidatorCompiler(
    ({ schema }: { schema: ObjectSchema }) =>
      (data) =>
        schema.validate(data)
  );
  app.setErrorHandler(apiErrorHandler);
  await app.ready();
}
