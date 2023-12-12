import type { TranslateFunction } from '@grammyjs/i18n';
import { InlineKeyboard, Keyboard } from 'grammy';

export default class Keyboards {
  static readonly lang = new Keyboard().text('uk').text('en');

  static form(t: TranslateFunction, url: string) {
    return new InlineKeyboard().webApp(t('btnAssistance'), url);
  }
}
