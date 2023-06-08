import { Controller, Get, Query, Route, Tags } from 'tsoa';
import { NewsService } from './news.service';
import { Article, NewsCategory, NewsCountry, NewsLanguage, Source } from './news.types';

@Route('/news')
@Tags('News')
export class NewsController extends Controller {
  private newsService: NewsService;

  constructor() {
    super();
    this.newsService = new NewsService();
  }

  @Get('headlines')
  async getHeadlines(
    @Query('country') country?: NewsCountry,
    @Query('category') category: NewsCategory = 'general',
    @Query('sources') sources = '',
    @Query('q') q = '',
    @Query('pageSize') pageSize = 10
  ): Promise<Article[]> {
    return this.newsService.getHeadlines({ category, country, sources, q, pageSize });
  }

  @Get('sources')
  async getSources(
    @Query('category') category?: NewsCategory,
    @Query('language') language?: NewsLanguage,
    @Query('country') country?: NewsCountry
  ): Promise<Source[]> {
    return this.newsService.getSources({ category, country, language });
  }
}
