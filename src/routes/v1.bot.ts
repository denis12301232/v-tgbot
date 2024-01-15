import type { FastifyPluginAsync } from 'fastify';
import BotController from '#controllers/bot.controller';
import { BotSchemas } from '#/app/schemas/bot.schema';

const bot: FastifyPluginAsync = async (app) => {
  app.get('/form', { schema: BotSchemas.form }, BotController.form);
};

export default bot;
