import { Passport } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    passports: async (_parent: unknown, { limit = 0 }: { limit: number }): Promise<Passport[]> => {
      const urlSearchParams = new URLSearchParams();
      if (limit) urlSearchParams.set('limit', limit.toString());
      return await farfetch<Passport[]>(`${BASE_API}/passports?${urlSearchParams.toString()}`);
    },
  },
};
