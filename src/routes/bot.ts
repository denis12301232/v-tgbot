import type { FastifyInstance } from 'fastify';
import BotController from '@/api/controllers/BotController.js';
import BotSchemas from '@/api/schemas/BotSchemas.js';

export default async function AssistanceRoutes(app: FastifyInstance) {
  app.post('/assistance', { schema: { body: BotSchemas.assistanceBody } }, BotController.assistance);
}
