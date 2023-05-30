import { Language } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class LanguagesService {
  async getLanguages(): Promise<Language[]> {
    const languages: Language[] = await prismaClient.language.findMany({
      include: {
        countries: {
          select: { country: { select: { commonName: true, region: true, subregion: true, population: true } } },
        },
      },
    });
    return languages;
  }

  async getLanguage(code: string): Promise<Language> {
    const language: Language = await prismaClient.language.findFirstOrThrow({
      where: { code },
      include: {
        countries: {
          select: { country: { select: { commonName: true, region: true, subregion: true, population: true } } },
        },
      },
    });
    return language;
  }
}
