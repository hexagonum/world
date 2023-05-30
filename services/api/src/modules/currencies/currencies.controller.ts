import { Currency } from '@prisma/client';
import { Controller, Get, Route, Tags } from 'tsoa';
import { CurrenciesService } from './currencies.service';

@Route('/currencies')
@Tags('Currencies')
export class CurrenciesController extends Controller {
  private currenciesService: CurrenciesService;

  constructor() {
    super();
    this.currenciesService = new CurrenciesService();
  }

  @Get()
  async getCurrencies(): Promise<Currency[]> {
    return this.currenciesService.getCurrencies();
  }
}
