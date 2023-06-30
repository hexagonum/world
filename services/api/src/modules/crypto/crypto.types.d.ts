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

export type TimePeriod =
  | '1h'
  | '3h'
  | '12h'
  | '24h'
  | '7d'
  | '30d'
  | '3m'
  | '1y'
  | '3y'
  | '5y';

export type Tier = '1' | '2' | '3';

export type OrderBy =
  | 'price'
  | 'marketCap'
  | '24hVolume'
  | 'change'
  | 'listedAt';
