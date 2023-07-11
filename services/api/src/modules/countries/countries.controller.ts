import { Country } from '@prisma/client';
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { CountriesService } from './countries.service';

@Route('/countries')
@Tags('Countries')
export class CountriesController extends Controller {
  private countriesService: CountriesService;

  constructor() {
    super();
    this.countriesService = new CountriesService();
  }

  @Get()
  @SuccessResponse(200)
  async getCountries(
    @Query('codes') codes = '',
    @Query('timezone') timezone = ''
  ) {
    return this.countriesService.getCountries({ codes, timezone });
  }

  @Get(':code')
  @SuccessResponse(200)
  async getCountry(@Path('code') code: string): Promise<Country> {
    return this.countriesService.getCountry(code);
  }

  @Post('search')
  @SuccessResponse(200)
  async searchCountries(@Body() { query = '' }: { query: string }) {
    return this.countriesService.searchCountries({ query });
  }
}
