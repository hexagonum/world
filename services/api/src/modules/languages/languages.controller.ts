import { Controller, Get, Route, Tags } from 'tsoa';

@Route('/languages')
@Tags('Languages')
export class LanguagesController extends Controller {
  @Get()
  getLanguages() {
    return [];
  }
}
