import type { MyContext } from '@/types';
import { Bot } from 'grammy';


export const bot = new Bot<MyContext>(process.env.BOT_TOKEN);
export { Commands } from './Commands';
export { Keyboards } from './Keyboards';
export { BotUtils } from './BotUtils';