declare namespace NodeJS {
   interface ProcessEnv {
      readonly PORT: number;
      readonly BOT_TOKEN: string;
      readonly SERVER_DOMAIN: string;
      readonly API_URL: string;
   }
}