import { Currency } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class CurrenciesService {
  async getCurrencies(): Promise<Currency[]> {
    const currencies: Currency[] = await prismaClient.currency.findMany({
      include: {
        countries: {
          select: { country: { select: { commonName: true, region: true, subregion: true, population: true } } },
        },
      },
    });
    return currencies;
  }

  async getCurrency(code: string): Promise<Currency> {
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
