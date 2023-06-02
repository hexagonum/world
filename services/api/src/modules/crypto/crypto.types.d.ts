export type CoinsResponse = {
  status: string;
  data: { coins: Coin[] };
};

export type CoinResponse = { status: string; data: { coin: Coin } };

export type Coin = {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  tier: number;
  change: string;
  rank: number;
  sparkline: string[];
  lowVolume: boolean;
  coinrankingUrl: string;
  '24hVolume': string;
  btcPrice: string;
};
