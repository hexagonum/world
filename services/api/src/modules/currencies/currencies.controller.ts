import { Currency } from '@prisma/client';
import {
  Controller,
  Get,
  Path,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { CurrenciesService } from './currencies.service';
import { ForexHistory, ForexSource } from './currencies.types';

@Route('/currencies')
@Tags('Currencies')
export class CurrenciesController extends Controller {
  private currenciesService: CurrenciesService;

  constructor() {
    super();
    this.currenciesService = new CurrenciesService();
  }

  @Get()
  @SuccessResponse(200)
  async getCurrencies(): Promise<Currency[]> {
    return this.currenciesService.getCurrencies();
  }

  @Get('rates')
  @SuccessResponse(200)
  async getRates(
    @Query('amount') amount = 1,
    @Query('base') base = 'EUR',
    @Query('to') to = '',
    @Query('source') source: ForexSource = 'fixer'
  ): Promise<{ code: string; rate: number }[]> {
    return this.currenciesService.getRates({ amount, base, to, source });
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
