import type { Context, SessionFlavor } from 'grammy';
import type { I18nFlavor } from '@grammyjs/i18n';
import type { Langs } from './index.js';

export type MyContext = Context & SessionFlavor<SessionData> & I18nFlavor;

interface SessionData {
  __language_code?: Langs;
  locale: Langs;
}
