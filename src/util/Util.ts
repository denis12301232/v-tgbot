import type { AssistanceForm } from '@/types';
import { Constants } from '@/util';


export class Util {
   static deepCopy<T = any[] | { [name: string]: any }>(target: any[] | { [name: string]: any }): T {
      if (Array.isArray(target)) {
         return target.reduce((box, item) => {
            if (Array.isArray(item) || typeof item === 'object') {
               return [...box, this.deepCopy(item)];
            } else {
               return [...box, item];
            }
         }, []);
      } else {
         return Object.entries(target).reduce((box, [key, value]) => {
            if (Array.isArray(value) || typeof value === 'object') {
               return { ...box, [key]: this.deepCopy(value) };
            } else {
               return { ...box, [key]: value }
            }
         }, {} as T);
      }
   }

   static showForm(form: any) {
      return Object.entries(form).reduce((box, [key, value]) => {
         return [...box, `${Constants.assistance[key as keyof AssistanceForm].display}: ${value}`];
      }, [] as string[]).join('\n');
   }
}