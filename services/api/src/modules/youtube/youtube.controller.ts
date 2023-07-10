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
  async getVideoCategories(@Query('countryCode') regionCode = 'US') {
    return this.youTubeService.getVideoCategories({ regionCode });
  }

  @Get('/videos')
  async getVideos(
    @Query('countryCode') regionCode = '',
    @Query('categoryId') videoCategoryId = '',
    @Query('trending') trending = true,
    @Query('maxResults') maxResults = 50
  ) {
    return this.youTubeService.getVideos({
      maxResults,
      regionCode,
      trending,
      videoCategoryId,
    });
  }
}
