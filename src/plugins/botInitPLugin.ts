import type { FastifyPluginCallback } from 'fastify';
import type { MyContext } from '@/types/index.js';
import fp from 'fastify-plugin';
import { Bot, session } from 'grammy';
import { I18n } from '@grammyjs/i18n';
import { Commands } from '@/bot/index.js';

const botInitPlugin: FastifyPluginCallback = async (app, opts, done) => {
  const bot = new Bot<MyContext>(process.env.BOT_TOKEN);
  const i18n = new I18n<MyContext>({
    defaultLocale: 'ru',
    directory: 'src/bot/locales',
    localeNegotiator: (ctx) => ctx.session.locale ?? ctx.from?.language_code ?? 'en',
  });
  bot.api.setMyCommands([
    { command: 'help', description: 'Help' },
    { command: 'start', description: 'Start' },
    { command: 'form', description: 'Form' },
    { command: 'language', description: 'Language' },
  ]);
  bot.use(
    session({
      initial: () => ({}),
    })
  );

  bot.use(i18n);
  bot.command('start', Commands.start);
  bot.command('language', Commands.language);
  bot.command('help', Commands.help);
  bot.command('form', Commands.form);
  bot.hears('ru', Commands.setLang('ru'));
  bot.hears('uk', Commands.setLang('uk'));
  bot.hears('en', Commands.setLang('en'));
  app.decorate('bot', bot);
  done();
};

export default fp(botInitPlugin);
