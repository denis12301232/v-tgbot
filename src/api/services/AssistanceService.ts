import type { SendFormResponse, AssistanceForm } from '@/types'
import axios, { type AxiosResponse } from 'axios'


export class AssistanceService {
   static async saveForm(form: AssistanceForm): Promise<AxiosResponse<SendFormResponse>> {
      const response = await axios.post<SendFormResponse>(`${process.env.API_URL}/api/assistance`, { form });
      return response;
   }
}