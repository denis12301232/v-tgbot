import type { BotQueries } from '@/types/index.js';
import Joi from 'joi';

export default class BotSchemas {
  static readonly assistanceBody = Joi.object<BotQueries.AssitanceBody>({
    queryId: Joi.string().required(),
    message: Joi.string().required(),
  }).required();
}
