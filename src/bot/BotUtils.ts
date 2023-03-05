import type { Context } from 'grammy';
import type { SessionData, MyContext, MyConversation, ConversationQuestionWithValidators } from '@/types';


export class BotUtils {
   static getSessionKey(ctx: Context) {
      return ctx.from?.id.toString();
   };
   static initial(): SessionData {
      return {
         form: {
            name: '',
            surname: '',
            patronymic: '',
            phone: '',
            birth: '',
            district: '',
            street: '',
            house: '',
            flat: '',
            people_num: 0,
            people_fio: ['-'],
            invalids: 'Нет',
            kids: 'Нет',
            kids_age: ['-'],
            food: 'Нет',
            water: 'Нет',
            medicines: 'Нет',
            medicines_info: '-',
            hygiene: 'Нет',
            hygiene_info: '-',
            pampers: 'Нет',
            pampers_info: '-',
            diet: '-',
            pers_data_agreement: true,
            photo_agreement: true,
         },
      }
   };

   static async askConversationQuestion(message: string, conversation: MyConversation, ctx: MyContext) {
      await ctx.reply(message, { parse_mode: 'HTML' });
      const { msg: { text } } = await conversation.waitFor('message:text');
      return text;
   };

   static async askConversationQuestionWithValidators({ question, conversation, ctx, validators }: ConversationQuestionWithValidators) {
      let valid = false;
      let message = '';
      do {
         await ctx.reply(question, { parse_mode: 'HTML' });
         const { msg: { text } } = await conversation.waitFor('message:text');
         for (const validator of validators) {
            valid = validator(text);
            if (!valid) break;
         }
         message = text;
      } while (!valid);
      return message;
   };
}