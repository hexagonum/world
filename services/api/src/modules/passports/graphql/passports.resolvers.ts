import { Passport } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    passports: async (): Promise<Passport[]> => {
      return await farfetch<Passport[]>(`${BASE_API}/passports`);
    },
  },
};
