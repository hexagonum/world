import { API_KEY_NEWS } from '../../common/environments';
import { farfetch } from '../../common/libs/farfetch';
import logger from '../../common/libs/logger';
import { getJSON, setJSON } from '../../common/libs/redis';
import {
  Article,
  HeadlinesRequest,
  HeadlinesResponse,
  Source,
  SourcesRequest,
  SourcesResponse,
} from './news.types';

const BASE_URL = 'https://newsapi.org/v2';

export class NewsService {
  public async getHeadlines({
    category,
    country,
    sources,
    q,
    pageSize = 10,
  }: HeadlinesRequest): Promise<Article[]> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('apiKey', API_KEY_NEWS);
    let redisKey = 'news-headlines';
    if (category) {
      urlSearchParams.set('category', category);
      redisKey = `${redisKey}-${category}`;
    }
    if (country) {
      urlSearchParams.set('country', country);
      redisKey = `${redisKey}-${country}`;
    }
    if (sources) {
      urlSearchParams.set('sources', sources);
      redisKey = `${redisKey}-${sources}`;
    }
    if (q) {
      urlSearchParams.set('q', q);
      redisKey = `${redisKey}-${q}`;
    }
    if (pageSize) {
      urlSearchParams.set('pageSize', pageSize.toString());
      redisKey = `${redisKey}-${pageSize}`;
    }
    console.log('redisKey', redisKey);
    const url = `${BASE_URL}/top-headlines?${urlSearchParams.toString()}`;
    try {
      const cacheArticles: Article[] | null = await getJSON<Article[]>(
        redisKey
      );
      if (cacheArticles) return cacheArticles;
      const data: HeadlinesResponse = await farfetch<HeadlinesResponse>(url);
      const { articles = [] } = data;
      return articles;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getSources({
    category,
    country,
    language,
  }: SourcesRequest): Promise<Source[]> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('apiKey', API_KEY_NEWS);
    let redisKey = 'news-sources';
    if (category) {
      urlSearchParams.set('category', category);
      redisKey = `${redisKey}-${category}`;
    }
    if (country) {
      urlSearchParams.set('country', country);
      redisKey = `${redisKey}-${country}`;
    }
    if (language) {
      urlSearchParams.set('language', language);
      redisKey = `${redisKey}-${language}`;
    }
    console.log('redisKey', redisKey);
    const url = `${BASE_URL}/top-headlines/sources?${urlSearchParams.toString()}`;
    try {
      const cacheSources: Source[] | null = await getJSON<Source[]>(redisKey);
      if (cacheSources) return cacheSources;
      const data = await farfetch<SourcesResponse>(url);
      const { sources = [] } = data;
      setJSON<Source[]>(redisKey, sources).catch(logger.error);
      return sources;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
