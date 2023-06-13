import type { Bot } from 'grammy';
import type { MyContext } from '@/types/index.js';

declare module 'fastify' {
  export interface FastifyInstance {
    bot: Bot<MyContext>;
  }
}
