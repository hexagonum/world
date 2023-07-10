import { farfetch } from '../../libs/farfetch';
import { LatestResponse } from './type';

export class FrankfurterClient {
  private base = 'https://api.frankfurter.app';

  async getLatest(): Promise<LatestResponse> {
    const url = `${this.base}/latest`;
    return farfetch<LatestResponse>(url);
  }

  async getSymbols(): Promise<Record<string, string>> {
    const url = `${this.base}/currencies`;
    return farfetch<Record<string, string>>(url);
  }
}
