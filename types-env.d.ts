declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: number;
    readonly HOST: string;
    readonly BOT_TOKEN: string;
    readonly BOT_WEBHOOK_URL: string;
    readonly BOT_WEBHOOK_TOKEN: string;
    readonly WEBSITE: string;
  }
}
