import { NewsClient } from '../../common/client/news';
import {
  NewsArticle,
  NewsSource,
  NewsSourcesRequest,
  NewsTopHeadlinesRequest,
} from '../../common/client/news/types';
import { API_KEY_NEWS } from '../../common/environments';
import { logger } from '../../common/libs/logger';
import { getJSON, setJSON } from '../../common/database/redis';

export class NewsService {
  private newsClient: NewsClient;

  constructor() {
    this.newsClient = new NewsClient(API_KEY_NEWS);
  }

  public async getHeadlines({
    category,
    country,
    sources,
    q,
    pageSize = 10,
  }: NewsTopHeadlinesRequest): Promise<NewsArticle[]> {
    let redisKey = 'news-headlines';
    if (category) redisKey = `${redisKey}-${category}`;
    if (country) redisKey = `${redisKey}-${country}`;
    if (sources) redisKey = `${redisKey}-${sources}`;
    if (q) redisKey = `${redisKey}-${q}`;
    if (pageSize) redisKey = `${redisKey}-${pageSize}`;
    logger.info(`getHeadlines redisKey=${redisKey}`);
    try {
      const cacheArticles: NewsArticle[] | null = await getJSON<NewsArticle[]>(
        redisKey
      );
      if (cacheArticles) return cacheArticles;
      const topHeadlinesRequest = { category, country, sources, q, pageSize };
      const data = await this.newsClient.getTopHeadlines(topHeadlinesRequest);
      const { articles = [] } = data;
      return articles;
    } catch (error) {
      logger.info(`getHeadlines error=${error}`);
      return [];
    }
  }

  public async getSources({
    category,
    country,
    language,
  }: NewsSourcesRequest): Promise<NewsSource[]> {
    let redisKey = 'news-sources';
    if (category) redisKey = `${redisKey}-${category}`;
    if (country) redisKey = `${redisKey}-${country}`;
    if (language) redisKey = `${redisKey}-${language}`;
    logger.info(`getSources redisKey=${redisKey}`);
    try {
      const cacheSources: NewsSource[] | null = await getJSON<NewsSource[]>(
        redisKey
      );
      if (cacheSources) return cacheSources;
      const sourcesRequest = { category, country, language };
      const data = await this.newsClient.getSources(sourcesRequest);
      const { sources = [] } = data;
      setJSON<NewsSource[]>(redisKey, sources).catch(logger.error);
      return sources;
    } catch (error) {
      logger.info(`getSources error=${error}`);
      return [];
    }
  }
}
