import type { SessionFlavor, Context } from 'grammy'
import type { Conversation, ConversationFlavor } from '@grammyjs/conversations'


export interface SendFormResponse {
   message: string;
   saved: AssistanceForm & { _id: string };
}
export interface SessionData {
   form: AssistanceForm;
}
export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;
export interface ConversationQuestionWithValidators {
   question: string;
   conversation: MyConversation;
   ctx: MyContext;
   validators: Function[];
}

export interface AssistanceForm {
   name: string;
   surname: string;
   patronymic: string;
   phone: string;
   birth: string;
   district: string;
   street: string;
   house: string;
   flat: string;
   people_num: number;
   people_fio: string[];
   invalids: string;
   kids: string;
   kids_age: string[];
   food: string;
   water: string;
   medicines: string;
   medicines_info: string;
   hygiene: string;
   hygiene_info: string;
   pampers: string;
   pampers_info: string;
   diet: string;
   pers_data_agreement: boolean;
   photo_agreement: boolean;
}