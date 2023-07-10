import { farfetch } from '../../libs/farfetch';
import { Area } from './types';

export class FootballDataClient {
  private base = 'http://api.football-data.org/v4';
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public async getAreas(): Promise<Area[]> {
    const url = `${this.base}/areas`;
    const headers = { 'X-Auth-Token': this.key };
    const response = await farfetch<{ areas: Area[] }>(url, { headers });
    const areas: Area[] = response.areas ?? [];
    return areas;
  }
}
