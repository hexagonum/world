import { Controller, Get, Route, Tags } from 'tsoa';
import { CountriesService } from './countries.service';
import { Country } from '@prisma/client';
import { CountryGoogleTrends } from './countries.types';

@Route('/countries')
@Tags('Countries')
export class CountriesController extends Controller {
  private countriesService: CountriesService;

  constructor() {
    super();
    this.countriesService = new CountriesService();
  }

  @Get()
  async getCountries(): Promise<Country[]> {
    return this.countriesService.getCountries();
  }

  @Get('google/trends')
  async getTrends(): Promise<Pick<Country, CountryGoogleTrends>[]> {
    return this.countriesService.getGoogleTrends();
  }
}
