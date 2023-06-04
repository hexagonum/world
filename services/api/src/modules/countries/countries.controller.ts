import { Country } from '@prisma/client';
import { Controller, Get, Path, Query, Route, Tags } from 'tsoa';
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
  async getCountries(@Query('codes') codes = '', @Query('timezone') timezone = '') {
    return this.countriesService.getCountries({ codes, timezone });
  }

  @Get(':code')
  async getCountry(@Path('code') code: string): Promise<Country> {
    return this.countriesService.getCountry(code);
  }
}
