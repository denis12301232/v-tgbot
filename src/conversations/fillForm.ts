import type { MyContext, MyConversation } from '@/types';
import type { InlineKeyboard } from 'grammy';
import { BotUtils, Keyboards } from '@/bot';
import { Constants, Validate, Util } from '@/util';
import { AssistanceService } from '@/api/services';


export async function fillForm(conversation: MyConversation, ctx: MyContext) {
   try {
      // ФАМИЛИЯ
      const surname = await BotUtils.askConversationQuestion('<b>Введите фамилию:</b>', conversation, ctx);
      conversation.session.form.surname = surname;
      // ИМЯ
      const name = await BotUtils.askConversationQuestion('<b>Введите имя:</b>', conversation, ctx);
      conversation.session.form.name = name;
      // ОТЧЕСТВО
      const patronymic = await BotUtils.askConversationQuestion('<b>Введите отчество:</b>', conversation, ctx);
      conversation.session.form.patronymic = patronymic;
      // НОМЕР ТЕЛЕФОНА
      const phone = await BotUtils.askConversationQuestionWithValidators({
         ctx, conversation, question: '<b>Введите номер телефона (10 цифр, начиная с нуля):</b>', validators: [Validate.is10NumbersPhone]
      });
      conversation.session.form.phone = '+38' + phone;
      // ДАТА РОЖДЕНИЯ
      const birth = await BotUtils.askConversationQuestionWithValidators({
         ctx, conversation, question: '<b>Введите дату рождения (гггг/мм/дд):</b>', validators: [Validate.isYYYYMMDD]
      });
      conversation.session.form.birth = birth;
      // АДРЕС
      await ctx.reply('<b>Aдрес:</b>', { parse_mode: 'HTML' });
      // РАЙОН
      await ctx.reply('Выберите район:', { reply_markup: Keyboards.district_keyboard });
      const district = await conversation.waitForHears(Constants.districts);
      conversation.session.form.district = district.match as string;
      // УЛИЦА
      const street = await BotUtils.askConversationQuestion('Введите улицу:', conversation, ctx);
      conversation.session.form.street = street;
      // ДОМ
      const house = await BotUtils.askConversationQuestion('Введите номер дома:', conversation, ctx);
      conversation.session.form.house = house;
      // КВАРТИРА
      const flat = await BotUtils.askConversationQuestion('Введите номер квартиры:', conversation, ctx);
      conversation.session.form.flat = flat;
      // ЧИСЛО ПРОЖИВАЮЩИХ
      const people_num = +await BotUtils.askConversationQuestionWithValidators({
         ctx, conversation, question: 'Число проживающих:', validators: [(value: string) => Number.isInteger(+value)]
      });
      conversation.session.form.people_num = people_num;
      // ФИО И ВОЗРАСТ ПРОЖИВАЮЩИХ
      if (conversation.session.form.people_num > 1) {
         for (let i = 0; i < conversation.session.form.people_num - 1; i++) {
            const human = await BotUtils.askConversationQuestion(`<b>Введите ФИО и возраст ${i + 1}:</b>`, conversation, ctx);
            conversation.session.form.people_fio = [...conversation.session.form.people_fio, human];
         }
      }
      // ИНВАЛИДЫ
      await ctx.reply('<b>Есть ли среди проживающих инвалиды?</b>', { reply_markup: Keyboards.yes_no_keyboard, parse_mode: 'HTML' });
      const invalids = await conversation.waitForHears(['Да', 'Нет']);
      conversation.session.form.invalids = invalids.match as string;
      // ДЕТИ
      await ctx.reply('<b>Есть ли дети?</b>', { reply_markup: Keyboards.yes_no_keyboard, parse_mode: 'HTML' });
      const kids = await conversation.waitForHears(['Да', 'Нет']);
      conversation.session.form.kids = kids.match as string;
      // ВОЗРАСТ ДЕТЕЙ
      if (conversation.session.form.kids === 'Да') {
         conversation.session.form.kids_age = [];
         let markup = Util.deepCopy<InlineKeyboard>(Keyboards.kids_age_markup);
         await ctx.reply('<b>Укажите возраст детей:</b>', { reply_markup: markup, parse_mode: 'HTML' });
         while (true) {
            const kids_age = await conversation.waitFor('callback_query:data');
            if (kids_age.update.callback_query.data === 'Ok') {
               await kids_age.editMessageReplyMarkup();
               break;
            }
            const age = kids_age.update.callback_query.data;
            if (conversation.session.form.kids_age.includes(age)) {
               const index = conversation.session.form.kids_age.indexOf(age);
               conversation.session.form.kids_age.splice(index, 1);
               switch (age) {
                  case '0-1':
                     markup.inline_keyboard[0][0].text = `от ${age.split('-')[0]} до ${age.split('-')[1]}`;
                     break;
                  case '1-3':
                     markup.inline_keyboard[0][1].text = `от ${age.split('-')[0]} до ${age.split('-')[1]}`;
                     break;
                  case '3-9':
                     markup.inline_keyboard[1][0].text = `от ${age.split('-')[0]} до ${age.split('-')[1]}`;
                     break;
                  case '9-18':
                     markup.inline_keyboard[1][1].text = `от ${age.split('-')[0]} до ${age.split('-')[1]}`;
                     break;
               }
            } else {
               conversation.session.form.kids_age = [...conversation.session.form.kids_age, age];
               switch (age) {
                  case '0-1':
                     markup.inline_keyboard[0][0].text = '\u2705 ' + age;
                     break;
                  case '1-3':
                     markup.inline_keyboard[0][1].text = '\u2705 ' + age;
                     break;
                  case '3-9':
                     markup.inline_keyboard[1][0].text = '\u2705 ' + age;
                     break;
                  case '9-18':
                     markup.inline_keyboard[1][1].text = '\u2705 ' + age;
                     break;
               }
            }
            const newMarkup = await kids_age.editMessageReplyMarkup({ reply_markup: markup });
            markup = (newMarkup as any).reply_markup;
            await kids_age.answerCallbackQuery();
         }
         await ctx.reply(`Выбрано: ${conversation.session.form.kids_age.join(', ')}`);
      }
      // ПРОДУКТЫ ПИТАНИЯ
      await ctx.reply('<b>Нужны ли продукты питания?</b>', { reply_markup: Keyboards.yes_no_keyboard, parse_mode: 'HTML' });
      const food = await conversation.waitForHears(['Да', 'Нет']);
      conversation.session.form.food = food.match as string;
      // ВОДА
      await ctx.reply('<b>Нужна ли вода?</b>', { reply_markup: Keyboards.yes_no_keyboard, parse_mode: 'HTML' });
      const water = await conversation.waitForHears(['Да', 'Нет']);
      conversation.session.form.water = water.match as string;
      // ЛЕКАРСТВА
      await ctx.reply('<b>Нужны ли лекарства?</b>', { reply_markup: Keyboards.yes_no_keyboard, parse_mode: 'HTML' });
      const medicines = await conversation.waitForHears(['Да', 'Нет']);
      conversation.session.form.medicines = medicines.match as string;
      // О ЛЕКАРСТВАХ 
      if (conversation.session.form.medicines === 'Да') {
         const medicines_info = await BotUtils.askConversationQuestion('<b>Укажите какие именно, кол-во, дозу:</b>', conversation, ctx);
         conversation.session.form.medicines_info = medicines_info;
      }
      // СРЕДСТВА ЛИЧНОЙ ГИГИЕНЫ
      await ctx.reply('<b>Нужны ли средства личной гигиены?</b>', { reply_markup: Keyboards.yes_no_keyboard, parse_mode: 'HTML' });
      const hygiene = await conversation.waitForHears(['Да', 'Нет']);
      conversation.session.form.hygiene = hygiene.match as string;
      // О СРЕДСТВАХ ЛИЧНОЙ ГИГИЕНЫ
      if (conversation.session.form.hygiene === 'Да') {
         const hygiene_info = await BotUtils.askConversationQuestion('<b>Укажите какие именно:</b>', conversation, ctx);
         conversation.session.form.hygiene_info = hygiene_info;
      }
      // ПАМПЕРСЫ
      await ctx.reply('<b>Памперсы?</b>', { reply_markup: Keyboards.yes_no_keyboard, parse_mode: 'HTML' });
      const pampers = await conversation.waitForHears(['Да', 'Нет']);
      conversation.session.form.pampers = pampers.match as string;
      // О ЛЕКАРСТВАХ 
      if (conversation.session.form.pampers === 'Да') {
         const pampers_info = await BotUtils.askConversationQuestion('<b>Укажите какие именно, кол-во, дозу:</b>', conversation, ctx);
         conversation.session.form.pampers_info = pampers_info;
      }
      // ОСОБЕННОСТИ ДИЕТЫ
      const diet = await BotUtils.askConversationQuestion('<b>Особенности диеты, алергии, диабет и т.д.</b>', conversation, ctx);
      conversation.session.form.diet = diet;
      // СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ
      await ctx.reply('<b>Даю согласие на обработку персональных данных</b>', {
         reply_markup: { keyboard: [[{ text: 'Да' }]], resize_keyboard: true, one_time_keyboard: true },
         parse_mode: 'HTML'
      });
      await conversation.waitForHears(['Да']);
      conversation.session.form.pers_data_agreement = true;
      // СОГЛАСИЕ НА ФОТО.ВИДЕО
      await ctx.reply('<b>Даю согласие на фото/видео</b>', {
         reply_markup: { keyboard: [[{ text: 'Да' }]], resize_keyboard: true, one_time_keyboard: true },
         parse_mode: 'HTML'
      });
      await conversation.waitForHears(['Да']);
      conversation.session.form.pers_data_agreement = true;

      await ctx.reply(`Вы ввели:\n${Util.showForm(conversation.session.form)}\nЕсли все верно - нажмите "Сохранить"`,
         { reply_markup: Keyboards.save_keyboard });
      const next = await conversation.waitForHears(['Сохранить', 'Вернутся назад']);
      switch (next.match as string) {
         case 'Сохранить':
            await conversation.external(() => AssistanceService.saveForm(conversation.session.form))
               .then(
                  () => { ctx.reply('Сохранено', { reply_markup: Keyboards.start_keyboard }) },
                  (e) => {
                     ctx.reply(e.message);
                     ctx.reply('Ошибка! Заявка не сохранена. Попробуйте снова.', { reply_markup: Keyboards.start_keyboard });
                  }
               );
            return;
         case 'Вернутся назад':
            await ctx.reply('Вы вернулись назад', { reply_markup: Keyboards.start_keyboard });
            return;
      }
   } catch (e) {
      if (e instanceof Error) {
         ctx.reply(e.message);
         ctx.reply('Произошла ошибка', { reply_markup: Keyboards.start_keyboard })
      }
      return;
   }
}