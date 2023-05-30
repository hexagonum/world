import { Currency } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class CurrenciesService {
  async getCurrencies(): Promise<Currency[]> {
    const currencies: Currency[] = await prismaClient.currency.findMany();
    return currencies;
  }

  async getCurrency(code: string): Promise<Currency> {
    const currency: Currency = await prismaClient.currency.findFirstOrThrow({ where: { code } });
    return currency;
  }
}
