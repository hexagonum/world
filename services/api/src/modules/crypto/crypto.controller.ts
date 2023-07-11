import {
  Controller,
  Get,
  Path,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { CryptoService } from './crypto.service';
import { Coin, OrderBy, Tier, TimePeriod } from './crypto.types';

@Route('/crypto')
@Tags('Crypto')
export class CryptoController extends Controller {
  private cryptoService: CryptoService;

  constructor() {
    super();
    this.cryptoService = new CryptoService();
  }

  @Get('coins')
  @SuccessResponse(200)
  async getCoins(
    @Query('timePeriod') timePeriod: TimePeriod = '24h',
    @Query('tier') tier: Tier = '1',
    @Query('orderBy') orderBy: OrderBy = 'change',
    @Query('limit') limit = 500
  ): Promise<Coin[]> {
    return this.cryptoService.getCoins({ timePeriod, tier, orderBy, limit });
  }

  @Get('coins/:id')
  @SuccessResponse(200)
  async getCoin(@Path('id') id: string): Promise<Coin> {
    return this.cryptoService.getCoin(id);
  }
}
