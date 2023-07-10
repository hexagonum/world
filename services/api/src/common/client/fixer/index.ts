import { farfetch } from '../../libs/farfetch';
import { LatestResponse, SymbolsResponse } from './types';

export class FixerClient {
  private base = 'http://data.fixer.io/api';
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  async getLatest(): Promise<LatestResponse> {
    const url = `${this.base}/latest?access_key=${this.key}`;
    return farfetch<LatestResponse>(url);
  }

  async getSymbols(): Promise<SymbolsResponse> {
    const url = `${this.base}/symbols?access_key=${this.key}`;
    return farfetch<SymbolsResponse>(url);
  }
}
