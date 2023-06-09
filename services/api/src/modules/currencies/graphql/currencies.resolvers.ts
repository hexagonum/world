import { Country, Currency } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';
import { ForexHistory, ForexRate } from '../currencies.types';

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
      { amount = 1, base = 'EUR', to = '' }: { amount: number; base: string; to: string }
    ): Promise<ForexRate[]> => {
      const urlSearchParams = new URLSearchParams();
      if (amount) urlSearchParams.set('amount', amount.toString());
      if (base) urlSearchParams.set('base', base);
      if (to) urlSearchParams.set('to', to);
      const url = `${BASE_API}/currencies/rates?${urlSearchParams.toString()}`;
      console.log(url);
      return farfetch<ForexRate[]>(url);
    },
    history: async (
      _parent: unknown,
      { amount = 1, from = 'EUR', to = 'USD' }: { amount: number; from: string; to: string }
    ): Promise<ForexHistory[]> => {
      const urlSearchParams = new URLSearchParams();
      if (amount) urlSearchParams.set('amount', amount.toString());
      if (from) urlSearchParams.set('from', from);
      if (to) urlSearchParams.set('to', to);
      const url = `${BASE_API}/currencies/history?${urlSearchParams.toString()}`;
      console.log(url);
      return farfetch<ForexHistory[]>(url);
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
