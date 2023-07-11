import { Passport } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';
import { logger } from '../../../common/libs/logger';

export const resolvers = {
  Query: {
    passports: async (
      _parent: unknown,
      { limit = 0, query = '' }: { limit: number; query: string }
    ): Promise<Passport[]> => {
      const urlSearchParams = new URLSearchParams();
      if (limit) urlSearchParams.set('limit', limit.toString());
      if (query) urlSearchParams.set('limit', query);
      const url = `${BASE_API}/passports?${urlSearchParams.toString()}`;
      logger.info(`passports url=${url}`);
      const { passports = [] } = await farfetch<{ passports: Passport[] }>(url);
      return passports;
    },
  },
};
