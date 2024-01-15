import type { MyContext } from '#/types';
import { I18n } from '@grammyjs/i18n';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const i18n = new I18n<MyContext>({
  defaultLocale: 'uk',
  useSession: true,
  directory: resolve(dirname(fileURLToPath(import.meta.url)), 'locales'),
});
