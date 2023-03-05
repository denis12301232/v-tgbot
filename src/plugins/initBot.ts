import type { FastifyPluginCallback } from 'fastify'
import { webhookCallback, session } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations'
import { bot, Commands, BotUtils } from '@/bot';
import { fillForm } from '@/conversations';


const initBot: FastifyPluginCallback<any> = async (fastify, options, done) => {
   await bot.api.setMyCommands([
      { command: 'start', description: 'Начать сначала' },
   ]);
   bot.use(session({ initial: BotUtils.initial, getSessionKey: BotUtils.getSessionKey }));
   bot.use(conversations());

   bot.command('start', Commands.start);
   bot.hears('Как пользоваться', Commands.howToUse);
   bot.use(createConversation(fillForm));

   bot.hears('Внести данные', Commands.enterData);
   bot.hears('Изменить', Commands.renterForm);
   bot.on('message:web_app_data', Commands.saveWebAppForm);

   fastify.post('/', webhookCallback(bot, 'fastify'));
   await bot.api.setWebhook(`${process.env.SERVER_DOMAIN}:${process.env.PORT}/`)
      .then(() => fastify.log.info('Bot webhook was set'))
      .catch((e: Error) => done(e));

   done();
};

export default initBot;