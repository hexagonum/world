import { API_KEY_NEWS } from '../../common/environments';
import { farfetch } from '../../common/libs/farfetch';
import { Article, HeadlinesRequest, HeadlinesResponse, Source, SourcesRequest, SourcesResponse } from './news.types';

const BASE_URL = 'https://newsapi.org/v2';

export class NewsService {
  public async getHeadlines({ category, country, sources, q, pageSize = 10 }: HeadlinesRequest): Promise<Article[]> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('apiKey', API_KEY_NEWS);
    if (category) urlSearchParams.set('category', category);
    if (country) urlSearchParams.set('country', country);
    if (sources) urlSearchParams.set('sources', sources);
    if (q) urlSearchParams.set('q', q);
    if (pageSize) urlSearchParams.set('pageSize', pageSize.toString());
    const url = `${BASE_URL}/top-headlines?${urlSearchParams.toString()}`;
    console.log(url);
    try {
      const data: HeadlinesResponse = await farfetch<HeadlinesResponse>(url);
      const sources: Article[] = data.articles;
      return sources;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getSources({ category, country, language }: SourcesRequest): Promise<Source[]> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('apiKey', API_KEY_NEWS);
    if (category) urlSearchParams.set('category', category);
    if (country) urlSearchParams.set('country', country);
    if (language) urlSearchParams.set('language', language);
    const url = `${BASE_URL}/top-headlines/sources?${urlSearchParams.toString()}`;
    try {
      const data = await farfetch<SourcesResponse>(url);
      const sources: Source[] = data.sources;
      return sources;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
