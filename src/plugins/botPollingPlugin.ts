import type { FastifyPluginCallback, onCloseHookHandler } from 'fastify';

const onClose: onCloseHookHandler = (app) => {
  app.bot.stop();
};

const botPollingPlugin: FastifyPluginCallback = async (app, opts, done) => {
  app.bot.start({ onStart: () => app.log.info({}, 'Bot started!') });
  app.addHook('onClose', onClose);
  app.bot.catch((e) => {
    app.log.error(e);
    app.close();
  });
  done();
};

export default botPollingPlugin;
