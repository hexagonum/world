import { Language } from '@prisma/client';
import { Controller, Get, Path, Route, SuccessResponse, Tags } from 'tsoa';
import { LanguagesService } from './languages.service';

@Route('/languages')
@Tags('Languages')
export class LanguagesController extends Controller {
  private languagesService: LanguagesService;

  constructor() {
    super();
    this.languagesService = new LanguagesService();
  }

  @Get()
  @SuccessResponse(200)
  async getLanguages(): Promise<Language[]> {
    return this.languagesService.getLanguages();
  }

  @Get(':code')
  @SuccessResponse(200)
  async getLanguage(@Path('code') code: string): Promise<Language> {
    return this.languagesService.getLanguage(code);
  }
}
