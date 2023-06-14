import type { FastifyPluginCallback } from 'fastify';
import { webhookCallback } from 'grammy';

interface Opts {
  endpoint: string;
}

const botWebhookPlugin: FastifyPluginCallback<Opts> = async (app, { endpoint }, done) => {
  app.post(endpoint, webhookCallback(app.bot, 'fastify'));
  app.bot.api
    .setWebhook(process.env.DOMAIN + endpoint)
    .then(() => app.log.info('Bot webhook was set'))
    .catch((e: Error) => {
      app.log.error(e);
      app.close();
    });
  done();
};

export default botWebhookPlugin;
