import { Currency } from '@prisma/client';
import { Controller, Get, Path, Query, Route, Tags } from 'tsoa';
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

  @Get('rates')
  async getRates(@Query('amount') amount = 1, @Query('base') base = 'EUR'): Promise<{ code: string; rate: number }[]> {
    return this.currenciesService.getRates({ amount, base });
  }

  @Get(':code')
  async getCurrency(@Path('code') code: string): Promise<Currency> {
    return this.currenciesService.getCurrency(code);
  }
}
