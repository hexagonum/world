import { Country } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    countries: async (
      _parent: unknown,
      { codes = '', timezone = '' }: { codes: string; timezone: string }
    ): Promise<Country[]> => {
      const urlSearchParams = new URLSearchParams();
      if (codes.length > 0) urlSearchParams.set('codes', codes);
      if (timezone.length > 0) urlSearchParams.set('timezone', timezone);
      return await farfetch<Country[]>(
        `${BASE_API}/countries?${urlSearchParams.toString()}`
      );
    },
    country: async (
      _parent: unknown,
      { code = '' }: { code: string }
    ): Promise<Country> => {
      return await farfetch<Country>(`${BASE_API}/countries/${code}`);
    },
  },
};
