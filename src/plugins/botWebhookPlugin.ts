import type { FastifyPluginCallback, onCloseHookHandler } from 'fastify';
import { webhookCallback } from 'grammy';

interface Opts {
  endpoint: string;
}

const onClose: onCloseHookHandler = (app) => {
  app.bot.api.deleteWebhook();
};

const botWebhookPlugin: FastifyPluginCallback<Opts> = async (app, { endpoint }, done) => {
  app.post(endpoint, webhookCallback(app.bot, 'fastify'));
  app.bot.api
    .setWebhook(process.env.DOMAIN + endpoint)
    .then(() => app.log.info({}, 'Bot webhook was set'))
    .catch((e: Error) => {
      app.log.error(e);
      app.close();
    });
  app.addHook('onClose', onClose);
  done();
};

export default botWebhookPlugin;
