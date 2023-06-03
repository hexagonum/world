import { Country } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    countries: async (): Promise<Country[]> => {
      return await farfetch<Country[]>(`${BASE_API}/countries`);
    },
  },
};
