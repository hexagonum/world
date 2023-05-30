import { Controller, Get, Path, Route, Tags } from 'tsoa';
import { TimezonesService } from './timezones.service';
import { Timezone } from '@prisma/client';

@Route('/timezones')
@Tags('Timezones')
export class TimezonesController extends Controller {
  private timezonesService: TimezonesService;

  constructor() {
    super();
    this.timezonesService = new TimezonesService();
  }

  @Get()
  async getTimezones(): Promise<Timezone[]> {
    return this.timezonesService.getTimezones();
  }

  @Get(':code')
  async getTimezone(@Path('code') code: string): Promise<Timezone> {
    return this.timezonesService.getTimezone(code);
  }
}
