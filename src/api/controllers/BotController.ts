import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { BotQueries } from '@/types/index.js';

export default class BotController {
  static async assistance(this: FastifyInstance, request: FastifyRequest<{ Body: BotQueries.AssitanceBody }>) {
    const { queryId, message } = request.body;
    this.bot.api.answerWebAppQuery(queryId, {
      id: queryId,
      title: 'Application sent',
      type: 'article',
      input_message_content: {
        message_text: message,
      },
    });
    return {};
  }
}
