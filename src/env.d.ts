declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: number;
    readonly HOST: string;
    readonly BOT_TOKEN: string;
    readonly DOMAIN: string;
    readonly SITE_URL: string;
  }
}
