import { Language } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    languages: async (): Promise<Language[]> => {
      return await farfetch<Language[]>(`${BASE_API}/languages`);
    },
    language: async (
      _parent: unknown,
      { code }: { code: string }
    ): Promise<Language> => {
      return farfetch<Language>(`${BASE_API}/languages/${code}`);
    },
  },
};
