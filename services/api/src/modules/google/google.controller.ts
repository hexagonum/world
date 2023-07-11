import { Controller, Get, Query, Route, SuccessResponse, Tags } from 'tsoa';
import { GoogleService } from './google.service';

@Route('/google')
@Tags('Google')
export class GoogleController extends Controller {
  private googleService: GoogleService;

  constructor() {
    super();
    this.googleService = new GoogleService();
  }

  @Get('trends')
  @SuccessResponse(200)
  async getTrends(@Query('countryCode') countryCode = '') {
    return this.googleService.getGoogleTrends({ countryCode });
  }

  @Get('ranks')
  @SuccessResponse(200)
  async getRanks(
    @Query('offset') offset = 0,
    @Query('limit') limit = 10
  ): Promise<{ rank: number; query: string; count: number }[]> {
    return this.googleService.getGoogleRanks({ offset, limit });
  }
}
