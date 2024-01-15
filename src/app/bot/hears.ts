import type { HearsMiddleware } from 'grammy';
import type { MyContext } from '#/types';

export namespace Hears {
  export const lang: HearsMiddleware<MyContext> = async (ctx) => {
    const locale = await ctx.i18n.getLocale();

    if (locale === ctx.message?.text) {
      return ctx.reply(ctx.t('langAlreadySet'));
    }
    ctx.session.__language_code = ctx.message?.text;
    await ctx.i18n.renegotiateLocale();
    return ctx.reply(`${ctx.t('langSet')}: ${ctx.session.__language_code?.toUpperCase()}`);
  };
}
