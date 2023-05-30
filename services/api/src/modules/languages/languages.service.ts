import { Language } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class LanguagesService {
  async getLanguages(): Promise<Language[]> {
    const languages: Language[] = await prismaClient.language.findMany();
    return languages;
  }

  async getLanguage(code: string): Promise<Language> {
    const language: Language = await prismaClient.language.findFirstOrThrow({ where: { code } });
    return language;
  }
}
