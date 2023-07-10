export type LatestResponse = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};

export type SymbolsResponse = {
  success: boolean;
  symbols: Record<string, string>;
};
