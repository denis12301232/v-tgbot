import type { RouteGenericInterface } from 'fastify';

export namespace Bot {
  export interface Form extends RouteGenericInterface {
    Querystring: {
      id: string;
      message: string;
    };
  }
}
