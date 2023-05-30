import { Controller, Get, Route, Tags } from 'tsoa';

@Route('/currencies')
@Tags('Currencies')
export class CurrenciesController extends Controller {
  @Get()
  getCurrencies() {
    return [];
  }
}
