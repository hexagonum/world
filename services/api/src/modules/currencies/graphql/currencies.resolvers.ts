import { Country, Currency } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    currencies: async (): Promise<Currency[]> => {
      return await farfetch<Currency[]>(`${BASE_API}/currencies`);
    },
    currency: async (_parent: unknown, { code }: { code: string }): Promise<Currency> => {
      const currency = await farfetch<Currency>(`${BASE_API}/currencies/${code}`);
      return currency;
    },
  },
  Currency: {
    code: ({ code }: Currency) => code,
    name: ({ name }: Currency) => name,
    symbol: ({ symbol }: Currency) => symbol,
    countries: ({ countries = [] }: { countries: { country: Country }[] }) => {
      return countries.map(({ country: { commonName, cca2, cca3, region, subregion, population } }) => {
        return { commonName, cca2, cca3, region, subregion, population };
      });
    },
  },
};
