import type { Bot } from '#/types';
import { object, string } from 'yup';

export namespace BotSchemas {
  export const form = {
    querystring: object<Bot.Form['Querystring']>({
      id: string().required(),
      message: string().required(),
    }).required(),
  };
}
