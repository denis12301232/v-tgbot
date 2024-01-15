import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { Bot } from '#/types';

export default class BotController {
  static async form(this: FastifyInstance, request: FastifyRequest<Bot.Form>) {
    const { id, message } = request.query;
    const result = await this.bot.api.answerWebAppQuery(id, {
      id,
      title: 'Form sent',
      type: 'article',
      input_message_content: {
        message_text: message,
      },
    });

    return result;
  }
}
