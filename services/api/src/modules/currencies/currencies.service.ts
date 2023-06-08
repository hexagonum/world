import { Currency } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';
import { farfetch } from '../../common/libs/farfetch';

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
  }: {
    amount: number;
    base: string;
  }): Promise<{ code: string; rate: number }[]> {
    const urlSearchParams = new URLSearchParams();
    if (amount) urlSearchParams.set('amount', amount.toString());
    if (base) urlSearchParams.set('base', base);
    const url = `https://api.frankfurter.app/latest?${urlSearchParams.toString()}`;
    const response = await farfetch<{ amount: number; base: string; date: string; rates: Record<string, number> }>(url);
    return Object.entries(response.rates)
      .map(([code, rate]) => ({ code, rate }))
      .sort((a, b) => a.rate - b.rate);
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
