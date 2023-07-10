import { farfetch } from '../../libs/farfetch';
import {
  NewsSourcesRequest,
  NewsSourcesResponse,
  NewsTopHeadlinesRequest,
  NewsTopHeadlinesResponse,
} from './types';

export class NewsClient {
  private base = 'https://newsapi.org/v2';
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public async getTopHeadlines({
    category,
    country,
    sources,
    q,
    pageSize = 10,
  }: NewsTopHeadlinesRequest): Promise<NewsTopHeadlinesResponse> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('apiKey', this.key);
    if (category) urlSearchParams.set('category', category);
    if (country) urlSearchParams.set('country', country);
    if (sources) urlSearchParams.set('sources', sources);
    if (q) urlSearchParams.set('q', q);
    if (pageSize) urlSearchParams.set('pageSize', pageSize.toString());
    const url = `${this.base}/top-headlines?${urlSearchParams.toString()}`;
    return farfetch<NewsTopHeadlinesResponse>(url);
  }

  public async getSources({
    category,
    country,
    language,
  }: NewsSourcesRequest): Promise<NewsSourcesResponse> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('apiKey', this.key);
    if (category) urlSearchParams.set('category', category);
    if (country) urlSearchParams.set('country', country);
    if (language) urlSearchParams.set('language', language);
    const endpoint = 'top-headlines/sources';
    const url = `${this.base}/${endpoint}?${urlSearchParams.toString()}`;
    return farfetch<NewsSourcesResponse>(url);
  }
}
