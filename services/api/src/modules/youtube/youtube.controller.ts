import { Controller, Get, Query, Route, Tags } from 'tsoa';
import { YouTubeService } from './youtube.service';

@Route('/youtube')
@Tags('YouTube')
export class YouTubeController extends Controller {
  private youTubeService: YouTubeService;

  constructor() {
    super();
    this.youTubeService = new YouTubeService();
  }

  @Get('/categories')
  async getVideoCategories(@Query('countryCode') countryCode = 'US') {
    return this.youTubeService.getVideoCategories(countryCode);
  }

  @Get('/videos')
  async getVideos(@Query('countryCode') countryCode = 'US', @Query('categoryId') categoryId = '') {
    return this.youTubeService.getVideos({ categoryId, regionCode: countryCode });
  }
}
