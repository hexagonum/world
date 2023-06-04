import { Country } from '@prisma/client';
import { Controller, Get, Path, Route, Tags } from 'tsoa';
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
  async getCountries() {
    return this.countriesService.getCountries();
  }

  @Get(':code')
  async getCountry(@Path('code') code: string): Promise<Country> {
    return this.countriesService.getCountry(code);
  }
}
