import { Coin, CoinResponse, CoinsResponse } from './crypto.types';

const BASE_URL = 'https://api.coinranking.com/v2';

export class CryptoService {
  async getCoins(): Promise<Coin[]> {
    try {
      const response = await fetch(`${BASE_URL}/coins`);
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
