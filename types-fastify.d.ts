import type { Bot } from 'grammy';
import type { MyContext } from '@/types';

declare module 'fastify' {
  export interface FastifyInstance {
    readonly bot: Bot<MyContext>;
  }
}
