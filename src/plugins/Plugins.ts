import botInitPlugin from './botInitPLugin.js';
import botPollingPlugin from './botPollingPlugin.js';
import botWebhookPlugin from './botWebhookPlugin.js';

export default class Plugins {
  static botInit = botInitPlugin;
  static botWebhook = botWebhookPlugin;
  static botPolling = botPollingPlugin;
}
