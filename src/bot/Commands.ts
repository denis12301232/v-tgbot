import type { CommandContext, HearsContext } from 'grammy'
import type { MyContext } from '@/types'
import { Keyboards } from '@/bot/Keyboards'


export class Commands {
   static async start(ctx: CommandContext<MyContext>) {
      try {
         await ctx.conversation.exit();
         return ctx.reply(`Привет, ${ctx.msg.from?.first_name || 'Аноним'}! Вас приветствует бот-помощник.`, {
            reply_markup: {
               keyboard: Keyboards.start_keyboard.build(),
               resize_keyboard: true,
            }
         });
      } catch (e) {
         if (e instanceof Error) return ctx.reply(e.message);
      }
   }

   static async howToUse(ctx: HearsContext<MyContext>) {
      try {
         await ctx.conversation.exit();
         const text = `Чтобы оставить заявку на получение гуманитарной помощи, выберите один из вариантов:\n1. "Внести данные" - здесь вам предстоит последовательно ответить на список вопросов.\n2. "Заполнить форму" - более удобный способ заполнения заявки (Может не работать на некоторых устройстах).\nЕсли не работает - используйте вариант №1`;
         return ctx.reply(text);
      } catch (e) {
         if (e instanceof Error) return ctx.reply(e.message);
      }
   }

   static async enterData(ctx: HearsContext<MyContext>) {
      try {
         return ctx.conversation.enter('fillForm');
      } catch (e) {
         if (e instanceof Error) return ctx.reply(e.message);
      }
   }

   static async renterForm(ctx: HearsContext<MyContext>) {
      try {
         const isActive = await ctx.conversation.active();
         if (isActive.fillForm) return ctx.conversation.reenter('fillForm');
      } catch (e) {
         if (e instanceof Error) return ctx.reply(e.message);
      }
   }

   static async saveWebAppForm(ctx: MyContext) {
      try {
         if (ctx?.msg?.web_app_data?.data) {
            const data = JSON.parse(ctx?.msg?.web_app_data?.data);
            return ctx.reply('Заявка отправлена!');
         }
      } catch (e) {
         if (e instanceof Error) return ctx.reply(e.message);
      }
   }
}