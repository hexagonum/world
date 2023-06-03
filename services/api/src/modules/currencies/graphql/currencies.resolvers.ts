import { Currency } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    currencies: async (): Promise<Currency[]> => {
      return await farfetch<Currency[]>(`${BASE_API}/currencies`);
    },
  },
};
