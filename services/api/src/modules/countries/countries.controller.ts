import { Controller, Get, Route, Tags } from 'tsoa';

@Route('/countries')
@Tags('Countries')
export class CountriesController extends Controller {
  @Get()
  getCountries() {
    return [];
  }
}
