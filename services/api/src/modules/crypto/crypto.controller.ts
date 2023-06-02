import { Controller, Get, Path, Route, Tags } from 'tsoa';
import { CryptoService } from './crypto.service';
import { Coin } from './crypto.types';

@Route('/crypto')
@Tags('Crypto')
export class CryptoController extends Controller {
  private cryptoService: CryptoService;

  constructor() {
    super();
    this.cryptoService = new CryptoService();
  }

  @Get('coins')
  async getCoins(): Promise<Coin[]> {
    return this.cryptoService.getCoins();
  }

  @Get('coins/:id')
  async getCoin(@Path('id') id: string): Promise<Coin> {
    return this.cryptoService.getCoin(id);
  }
}
