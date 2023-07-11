import { Passport, PassportRequirement } from '@prisma/client';
import {
  Controller,
  Get,
  Path,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
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
  @SuccessResponse(200)
  async getPassports(@Query('limit') limit = 0): Promise<Passport[]> {
    return this.passportsService.getPassports({ limit });
  }

  @Get(':code')
  @SuccessResponse(200)
  async getPassport(
    @Path('code') code: string
  ): Promise<PassportRequirement[]> {
    return this.passportsService.getPassport(code);
  }
}
