import type { Schema } from 'yup';
import fastify from 'fastify';
import App from '#/app';
import handler from '#/common/exeptions';
import { Plugin } from '#/plugins';
import { Routes } from '#/routes';

const app = new App(fastify({ logger: true }));

async function main() {
  try {
    app
      .register(Plugin.bot, {
        endpoint: '/',
        secret: process.env.BOT_WEBHOOK_TOKEN,
      })
      .register(Routes.V1.bot, { prefix: '/api/v1/bot' })
      .setValidatorCompiler<Schema>(
        ({ schema }) =>
          (data) =>
            schema.validate(data)
      )
      .setErrorHandler(handler)
      .listen({ port: process.env.PORT, host: process.env.HOST });
  } catch (e) {
    app.log.fatal(e);
    app.close().then(() => process.exit(1));
  }
}

main();
