import { PrismaClient } from '@prisma/client';
import { FixerClient } from '../../common/client/fixer';
import { FrankfurterClient } from '../../common/client/frankfurter';
import { ONE_DAY } from '../../common/constants';
import { API_KEY_FIXER } from '../../common/environments';
import { farfetch } from '../../common/libs/farfetch';
import { logger } from '../../common/libs/logger';
import { getPrismaClient } from '../../common/libs/prisma';
import { getJSON, setJSON } from '../../common/libs/redis';
import { ForexHistory, ForexRate, ForexSource } from './currencies.types';

export class CurrenciesService {
  private prismaClient: PrismaClient;
  private fixerClient: FixerClient;
  private frankfurterClient: FrankfurterClient;

  constructor() {
    this.prismaClient = getPrismaClient();
    this.fixerClient = new FixerClient(API_KEY_FIXER);
    this.frankfurterClient = new FrankfurterClient();
  }

  public async getCurrencies() {
    const args = { include: { countries: { select: { country: true } } } };
    const currencies = await this.prismaClient.currency.findMany(args);
    return currencies.map((currency) => {
      return {
        ...currency,
        countries: currency.countries.map(({ country }) => country),
      };
    });
  }

  private async getRatesBySource(
    source: 'fixer' | 'frankfurter'
  ): Promise<Record<string, number>> {
    if (source === 'fixer') {
      const { rates = {} } = await this.fixerClient.getLatest();
      return rates;
    }
    if (source === 'frankfurter') {
      const { rates = {} } = await this.frankfurterClient.getLatest();
      return rates;
    }
    return {};
  }

  public async getRates({
    amount = 1,
    base = 'EUR',
    to = '',
    source = 'fixer',
  }: {
    amount: number;
    base: string;
    to: string;
    source: ForexSource;
  }): Promise<{ code: string; rate: number }[]> {
    const urlSearchParams = new URLSearchParams();
    let redisKey = `currencies-history`;

    if (amount) {
      urlSearchParams.set('amount', amount.toString());
      redisKey = `${redisKey}-${amount}`;
    }
    if (base) {
      urlSearchParams.set('base', base);
      redisKey = `${redisKey}-${base}`;
    }
    if (to) {
      urlSearchParams.set('to', to);
      redisKey = `${redisKey}-${to}`;
    }
    try {
      const cacheRates = await getJSON<ForexRate[]>(redisKey);
      if (cacheRates) return cacheRates;
      const rates = await this.getRatesBySource(source);
      const sortedRates = Object.entries(rates)
        .map(([code, rate]) => ({ code, rate }))
        .sort((a, b) => a.rate - b.rate);
      setJSON(redisKey, sortedRates, { expiresIn: 60 * 60 * 24 }).catch(
        logger.error
      );
      return sortedRates;
    } catch (error) {
      logger.error(`getRates error ${error}`);
      return [];
    }
  }

  public async getHistory({
    days = 7,
    amount = 1,
    from = 'EUR',
    to = 'USD',
  }: {
    days: number;
    amount: number;
    from: string;
    to: string;
  }): Promise<ForexHistory[]> {
    const toD = new Date();
    const [toDate] = toD.toISOString().split('T');
    const toTime = toD.getTime();
    const fromD = new Date(toTime - days * ONE_DAY);
    const [fromDate] = fromD.toISOString().split('T');

    const urlSearchParams = new URLSearchParams();
    let redisKey = `currencies-history`;
    if (amount) {
      urlSearchParams.set('amount', amount.toString());
      redisKey = `${redisKey}-${amount}`;
    }
    if (from) {
      urlSearchParams.set('base', from);
      redisKey = `${redisKey}-${from}`;
    }
    if (to) {
      urlSearchParams.set('to', to);
      redisKey = `${redisKey}-${to}`;
    }
    logger.info(`redisKey ${redisKey}`);

    try {
      const cacheHistory = await getJSON<ForexHistory[]>(redisKey);
      if (cacheHistory) return cacheHistory;
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
      const history: ForexHistory[] = dates.map((date) => {
        const value: Record<string, number> = rates[date];
        const toAmount: number = value[to];
        return { date, from: response.amount, to: toAmount };
      });
      setJSON(redisKey, history, { expiresIn: 60 * 60 * 24 }).catch(
        logger.error
      );
      return history;
    } catch (error) {
      logger.error(`getHistory error ${error}`);
      return [];
    }
  }

  public async getCurrency(code: string) {
    const currency = await this.prismaClient.currency.findFirstOrThrow({
      where: { code },
      include: {
        countries: {
          select: {
            country: true,
          },
        },
      },
    });
    return {
      ...currency,
      countries: currency.countries.map(({ country }) => country),
    };
  }
}
