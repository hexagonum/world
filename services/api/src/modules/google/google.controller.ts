import { Controller, Get, Query, Route, Tags } from 'tsoa';
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
  async getTrends(@Query('countryCode') countryCode = '') {
    return this.googleService.getGoogleTrends(countryCode);
  }

  @Get('ranks')
  async getRanks(@Query('limit') limit = 10): Promise<{ rank: number; query: string; count: number }[]> {
    return this.googleService.getGoogleRanks(limit);
  }
}
