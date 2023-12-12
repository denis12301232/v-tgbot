import type { CommandContext, HearsContext } from 'grammy';
import type { MyContext, Langs } from '@/types/index.js';
import { Keyboards } from '@/bot/index.js';

export default class Commands {
  static async start(ctx: CommandContext<MyContext>) {
    return ctx.reply(ctx.t('start'));
  }

  static language(ctx: CommandContext<MyContext>) {
    return ctx.reply(ctx.t('language'), {
      reply_markup: {
        keyboard: Keyboards.lang.build(),
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  static help(ctx: CommandContext<MyContext>) {
    const list = [
      `<b>${ctx.t('helpTitle')}:</b>\n`,
      `/start - ${ctx.t('helpStart')}`,
      `/form - ${ctx.t('helpForm')}`,
      `/about - ${ctx.t('helpAbout')}`,
      `/website - ${ctx.t('helpWebsite')}`,
      `/language - ${ctx.t('helpLanguage')}`,
    ];

    return ctx.reply(list.join('\n'), { parse_mode: 'HTML' });
  }

  static setLang(lang: Langs) {
    return async function (ctx: HearsContext<MyContext>) {
      const currentLocale = await ctx.i18n.getLocale();
      if (currentLocale === lang) {
        return ctx.reply(ctx.t('langAlreadySet'));
      }
      ctx.session.locale = lang;
      await ctx.i18n.renegotiateLocale();
      return ctx.reply(`${ctx.t('langSet')}: ${lang.toUpperCase()}`);
    };
  }

  static form(ctx: CommandContext<MyContext>) {
    return ctx.reply(`${ctx.t('assistance')}:`, {
      reply_markup: { inline_keyboard: Keyboards.form(ctx.t, process.env.FORM_URL).inline_keyboard },
    });
  }

  static about(ctx: CommandContext<MyContext>) {
    return ctx.reply(ctx.t('about'));
  }

  static website(ctx: CommandContext<MyContext>) {
    return ctx.reply(process.env.WEBSITE_URL);
  }
}
