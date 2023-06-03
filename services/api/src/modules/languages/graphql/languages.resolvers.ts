import { Language } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    languages: async (): Promise<Language[]> => {
      return await farfetch<Language[]>(`${BASE_API}/languages`);
    },
  },
};
