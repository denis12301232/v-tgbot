import type { MyContext } from '#/types';
import { type CommandMiddleware, Keyboard, InlineKeyboard } from 'grammy';

export namespace Commands {
  export const start: CommandMiddleware<MyContext> = (ctx) => ctx.reply(ctx.t('start'));
  export const website: CommandMiddleware<MyContext> = (ctx) => ctx.reply(process.env.WEBSITE);
  export const about: CommandMiddleware<MyContext> = (ctx) =>
    ctx.reply(ctx.t('about'), { parse_mode: 'HTML' });
  export const help: CommandMiddleware<MyContext> = (ctx) => {
    const list = [
      `<b>${ctx.t('helpTitle')}:</b>\n`,
      `/start - ${ctx.t('helpStart')}`,
      `/form - ${ctx.t('helpForm')}`,
      `/about - ${ctx.t('helpAbout')}`,
      `/website - ${ctx.t('helpWebsite')}`,
      `/language - ${ctx.t('helpLanguage')}`,
    ];

    return ctx.reply(list.join('\n'), { parse_mode: 'HTML' });
  };

  export const language: CommandMiddleware<MyContext> = (ctx) =>
    ctx.reply(ctx.t('language'), {
      reply_markup: {
        keyboard: new Keyboard().text('uk').text('en').build(),
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });

  export const form: CommandMiddleware<MyContext> = (ctx) => {
    return ctx.reply(`${ctx.t('assistance')}:`, {
      reply_markup: {
        inline_keyboard: new InlineKeyboard().webApp(
          ctx.t('btnAssistance'),
          `${process.env.WEBSITE}/google-form`
        ).inline_keyboard,
      },
    });
  };

  export const list = [
    { command: 'help', description: 'Help' },
    { command: 'start', description: 'Start' },
    { command: 'form', description: 'Form' },
    { command: 'about', description: 'About' },
    { command: 'website', description: 'Our website' },
    { command: 'language', description: 'Language' },
  ];
}
