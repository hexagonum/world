import { Controller, Get, Route, Tags } from 'tsoa';
import { LanguagesService } from './languages.service';
import { Language } from '@prisma/client';

@Route('/languages')
@Tags('Languages')
export class LanguagesController extends Controller {
  private languagesService: LanguagesService;

  constructor() {
    super();
    this.languagesService = new LanguagesService();
  }

  @Get()
  async getLanguages(): Promise<Language[]> {
    return this.languagesService.getLanguages();
  }
}
