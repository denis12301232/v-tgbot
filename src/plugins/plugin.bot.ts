import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { webhookCallback } from 'grammy';
import bot from '#app/bot';

interface Options {
  endpoint?: string;
  secret?: string;
}

const botPlugin: FastifyPluginAsync<Options> = async (app, { endpoint, secret }) => {
  try {
    app.decorate('bot', bot);

    if (process.argv.includes('-w') && endpoint) {
      await app
        .addHook('onClose', () => app.bot.api.deleteWebhook())
        .post(endpoint, webhookCallback(app.bot, 'fastify', 'throw', 10000, secret))
        .bot.api.setWebhook(new URL(endpoint, process.env.BOT_WEBHOOK_URL).href, {
          secret_token: secret,
        })
        .then(() => app.log.info('Bot webhook was set'));
    } else {
      app
        .addHook('onClose', () => app.bot.stop())
        .bot.start({ onStart: (info) => app.log.info(info) });
    }
  } catch (e) {
    app.log.error(e);
    app.close();
  }
};

export default fastifyPlugin(botPlugin);
