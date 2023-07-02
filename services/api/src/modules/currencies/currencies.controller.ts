import { Currency } from '@prisma/client';
import { Controller, Get, Path, Query, Route, Tags } from 'tsoa';
import { CurrenciesService } from './currencies.service';
import { ForexHistory } from './currencies.types';

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
  async getRates(
    @Query('amount') amount = 1,
    @Query('base') base = 'EUR',
    @Query('to') to = ''
  ): Promise<{ code: string; rate: number }[]> {
    return this.currenciesService.getRates({ amount, base, to });
  }

  @Get('history')
  async getHistory(
    @Query('amount') amount = 1,
    @Query('days') days = 7,
    @Query('from') from = 'EUR',
    @Query('to') to = 'USD'
  ): Promise<ForexHistory[]> {
    return this.currenciesService.getHistory({ amount, days, from, to });
  }

  @Get(':code')
  async getCurrency(@Path('code') code: string): Promise<Currency> {
    return this.currenciesService.getCurrency(code);
  }
}
