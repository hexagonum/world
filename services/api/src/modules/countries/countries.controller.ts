import { Controller, Get, Path, Route, Tags } from 'tsoa';
import { CountriesService } from './countries.service';
import { Country } from '@prisma/client';
import { CountryGoogleTrends, CountryPassports } from './countries.types';

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

  @Get('passports')
  async getPassports(): Promise<Pick<Country, CountryPassports>[]> {
    return this.countriesService.getPassports();
  }

  @Get(':code')
  async getCountry(@Path('code') code: string): Promise<Country> {
    return this.countriesService.getCountry(code);
  }

  @Get(':code/passports')
  async getPassport(@Path('code') code: string): Promise<Pick<Country, CountryPassports | 'passportRequirements'>> {
    return this.countriesService.getPassport(code);
  }
}
