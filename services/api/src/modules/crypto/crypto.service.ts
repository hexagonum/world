import { Coin, CoinResponse, CoinsResponse, OrderBy, Tier, TimePeriod } from './crypto.types';

const BASE_URL = 'https://api.coinranking.com/v2';

export class CryptoService {
  async getCoins({
    timePeriod = '24h',
    tier = '1',
    orderBy = 'change',
    limit = 5000,
  }: {
    timePeriod: TimePeriod;
    tier: Tier;
    orderBy: OrderBy;
    limit: number;
  }): Promise<Coin[]> {
    try {
      const urlSearchParams = new URLSearchParams();
      if (timePeriod) urlSearchParams.set('timePeriod', timePeriod);
      if (tier) urlSearchParams.set('tier', tier);
      if (orderBy) urlSearchParams.set('orderBy', orderBy);
      if (limit) urlSearchParams.set('limit', limit.toString());
      const response = await fetch(`${BASE_URL}/coins?${urlSearchParams.toString()}`);
      const data: CoinsResponse = await response.json();
      const coins = data.data.coins;
      return coins;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getCoin(id: string): Promise<Coin> {
    try {
      const response = await fetch(`${BASE_URL}/coin/${id}`);
      const data: CoinResponse = await response.json();
      const coin = data.data.coin;
      return coin;
    } catch (error) {
      console.error(error);
      return {} as Coin;
    }
  }
}
