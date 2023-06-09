import { Currency } from '@prisma/client';
import { farfetch } from '../../common/libs/farfetch';
import { prismaClient } from '../../common/libs/prisma';
import { ForexHistory } from './currencies.types';

const ONE_DAY = 1000 * 60 * 60 * 24;

export class CurrenciesService {
  public async getCurrencies(): Promise<Currency[]> {
    const currencies: Currency[] = await prismaClient.currency.findMany({
      include: {
        countries: {
          select: { country: { select: { commonName: true, region: true, subregion: true, population: true } } },
        },
      },
    });
    return currencies;
  }

  public async getRates({
    amount = 1,
    base = 'EUR',
    to = '',
  }: {
    amount: number;
    base: string;
    to: string;
  }): Promise<{ code: string; rate: number }[]> {
    const urlSearchParams = new URLSearchParams();
    if (amount) urlSearchParams.set('amount', amount.toString());
    if (base) urlSearchParams.set('base', base);
    if (to) urlSearchParams.set('to', to);
    const url = `https://api.frankfurter.app/latest?${urlSearchParams.toString()}`;
    const response = await farfetch<{ amount: number; base: string; date: string; rates: Record<string, number> }>(url);
    return Object.entries(response.rates)
      .map(([code, rate]) => ({ code, rate }))
      .sort((a, b) => a.rate - b.rate);
  }

  public async getHistory({
    amount = 1,
    from = 'EUR',
    to = '',
  }: {
    amount: number;
    from: string;
    to: string;
  }): Promise<ForexHistory[]> {
    const toD = new Date();
    const [toDate] = toD.toISOString().split('T');
    const toTime = toD.getTime();
    const fromD = new Date(toTime - 7 * ONE_DAY);
    const [fromDate] = fromD.toISOString().split('T');

    const urlSearchParams = new URLSearchParams();
    if (amount) urlSearchParams.set('amount', amount.toString());
    if (from) urlSearchParams.set('base', from);
    if (to) urlSearchParams.set('to', to);
    const url = `https://api.frankfurter.app/${fromDate}..${toDate}?${urlSearchParams.toString()}`;
    const response = await farfetch<{
      amount: number;
      base: string;
      start_date: string;
      end_date: string;
      rates: Record<string, Record<string, number>>;
    }>(url);
    const { rates } = response;
    const dates: string[] = Object.keys(rates);
    return dates.map((date) => {
      const value: Record<string, number> = rates[date];
      const toAmount: number = value[to];
      return { date, from: response.amount, to: toAmount };
    });
  }

  public async getCurrency(code: string): Promise<Currency> {
    const currency: Currency = await prismaClient.currency.findFirstOrThrow({
      where: { code },
      include: {
        countries: {
          select: {
            country: {
              select: { commonName: true, cca2: true, cca3: true, region: true, subregion: true, population: true },
            },
          },
        },
      },
    });
    return currency;
  }
}
