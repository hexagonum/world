import { Language } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class LanguagesService {
  async getLanguages(): Promise<Language[]> {
    const languages: Language[] = await prismaClient.language.findMany();
    return languages;
  }
}
