import { Timezone } from '@prisma/client';
import { Controller, Get, Path, Route, SuccessResponse, Tags } from 'tsoa';
import { TimezonesService } from './timezones.service';

@Route('/timezones')
@Tags('Timezones')
export class TimezonesController extends Controller {
  private timezonesService: TimezonesService;

  constructor() {
    super();
    this.timezonesService = new TimezonesService();
  }

  @Get()
  @SuccessResponse(200)
  async getTimezones(): Promise<Timezone[]> {
    return this.timezonesService.getTimezones();
  }

  @Get(':code')
  @SuccessResponse(200)
  async getTimezone(@Path('code') code: string): Promise<Timezone> {
    return this.timezonesService.getTimezone(code);
  }
}
