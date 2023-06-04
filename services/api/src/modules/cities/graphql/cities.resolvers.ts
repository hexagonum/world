import { City } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    cities: async (_parent: unknown, { countryCode = '' }: { countryCode: string }): Promise<City[]> => {
      const urlSearchParams = new URLSearchParams();
      if (countryCode.length > 0) urlSearchParams.set('countryCode', countryCode);
      return await farfetch<City[]>(`${BASE_API}/cities?${urlSearchParams.toString()}`);
    },
  },
};
