import { Controller, Get, Query, Route, Tags } from 'tsoa';
import { CitiesService } from './cities.service';

@Route('/cities')
@Tags('Cities')
export class CitiesController extends Controller {
  private citiesService: CitiesService;

  constructor() {
    super();
    this.citiesService = new CitiesService();
  }

  @Get()
  async getCities(@Query('countryCode') countryCode = '') {
    return this.citiesService.getCities({ countryCode });
  }
}
