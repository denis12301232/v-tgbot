import type { MyContext } from '#/types';
import { Bot, session } from 'grammy';
import { Commands } from './commands';
import { i18n } from './i18n';
import { Hears } from './hears';

const bot = new Bot<MyContext>(process.env.BOT_TOKEN);

bot.api.setMyCommands(Commands.list);
bot.use(session({ initial: () => ({}) })).use(i18n);
bot.command('start', Commands.start);
bot.command('about', Commands.about);
bot.command('website', Commands.website);
bot.command('help', Commands.help);
bot.command('language', Commands.language);
bot.command('form', Commands.form);
bot.hears(['en', 'uk'], Hears.lang);

export default bot;
