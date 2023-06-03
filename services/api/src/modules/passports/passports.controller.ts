import { Passport, PassportRequirement } from '@prisma/client';
import { Controller, Get, Path, Route, Tags } from 'tsoa';
import { PassportsService } from './passports.service';

@Route('/passports')
@Tags('Passports')
export class PassportsController extends Controller {
  private passportsService: PassportsService;

  constructor() {
    super();
    this.passportsService = new PassportsService();
  }

  @Get()
  async getPassports(): Promise<Passport[]> {
    return this.passportsService.getPassports();
  }

  @Get(':code')
  async getPassport(@Path('code') code: string): Promise<PassportRequirement[]> {
    return this.passportsService.getPassport(code);
  }
}
