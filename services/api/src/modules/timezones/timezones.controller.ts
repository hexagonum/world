import { Controller, Get, Route, Tags } from 'tsoa';

@Route('/timezones')
@Tags('Timezones')
export class TimezonesController extends Controller {
  @Get()
  getTimezones() {
    return [];
  }
}
