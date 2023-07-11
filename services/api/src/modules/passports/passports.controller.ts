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
  async getPassports(
    @Query('limit') limit: number = 0,
    @Query('query') query: string = ''
  ): Promise<{ total: number; passports: Passport[] }> {
    return this.passportsService.getPassports({ limit, query });
  }

  @Get(':code')
  @SuccessResponse(200)
  async getPassport(
    @Path('code') code: string
  ): Promise<{ total: number; requirements: PassportRequirement[] }> {
    return this.passportsService.getPassport(code);
  }
}
