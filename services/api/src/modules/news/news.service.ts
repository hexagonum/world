import { API_KEY_NEWS } from '../../common/environments';
import { Article, HeadlinesRequest, HeadlinesResponse, Source, SourcesResponse } from './news.types';

const BASE_URL = 'https://newsapi.org/v2';

export class NewsService {
  public async getHeadlines({ category, country, sources, q }: HeadlinesRequest): Promise<Article[]> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('apiKey', API_KEY_NEWS);
    if (category) urlSearchParams.set('category', category);
    if (country) urlSearchParams.set('country', country);
    if (sources) urlSearchParams.set('sources', sources);
    if (q) urlSearchParams.set('q', q);
    const url = `${BASE_URL}/top-headlines?${urlSearchParams.toString()}`;
    console.log(url);
    try {
      const response = await fetch(url);
      const data: HeadlinesResponse = await response.json();
      const sources: Article[] = data.articles;
      return sources;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getSources(): Promise<Source[]> {
    const url = `${BASE_URL}/top-headlines/sources?apiKey=${API_KEY_NEWS}`;
    try {
      const response = await fetch(url);
      const data: SourcesResponse = await response.json();
      const sources: Source[] = data.sources;
      return sources;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
