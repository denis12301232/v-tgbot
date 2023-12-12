declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: number;
    readonly HOST: string;
    readonly BOT_TOKEN: string;
    readonly DOMAIN: string;
    readonly WEBSITE_URL: string;
    readonly FORM_URL: string;
  }
}
