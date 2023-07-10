import { PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../../common/libs/prisma';

export class LanguagesService {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = getPrismaClient();
  }

  async getLanguages() {
    const languages = await this.prismaClient.language.findMany({
      include: { countries: { select: { country: true } } },
      orderBy: { countries: { _count: 'desc' } },
    });
    return languages.map((language) => {
      return {
        ...language,
        countries: language.countries.map(({ country }) => country),
      };
    });
  }

  async getLanguage(code: string) {
    const language = await this.prismaClient.language.findFirstOrThrow({
      include: { countries: { select: { country: true } } },
      where: { code },
    });
    return {
      ...language,
      countries: language.countries.map(({ country }) => country),
    };
  }
}
