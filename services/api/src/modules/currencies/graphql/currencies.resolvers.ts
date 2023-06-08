import { Country, Currency } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';
import { Rate } from '../currencies.types';

export const resolvers = {
  Query: {
    currencies: async (): Promise<Currency[]> => {
      return await farfetch<Currency[]>(`${BASE_API}/currencies`);
    },
    currency: async (_parent: unknown, { code }: { code: string }): Promise<Currency> => {
      const currency = await farfetch<Currency>(`${BASE_API}/currencies/${code}`);
      return currency;
    },
    rates: async (
      _parent: unknown,
      { amount = 1, base = 'EUR' }: { amount: number; base: string }
    ): Promise<Rate[]> => {
      const urlSearchParams = new URLSearchParams();
      if (amount) urlSearchParams.set('amount', amount.toString());
      if (base) urlSearchParams.set('base', base);
      const url = `${BASE_API}/currencies/rates?${urlSearchParams.toString()}`;
      console.log(url);
      return farfetch<Rate[]>(url);
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
