import botInitPlugin from './botInitPLugin.js';
import botWebhookPlugin from './botWebhookPlugin.js';

export default class Plugins {
  static botInit = botInitPlugin;
  static botWebhook = botWebhookPlugin;
}
