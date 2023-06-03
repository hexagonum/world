import { prismaClient } from '../../common/libs/prisma';

export class LanguagesService {
  async getLanguages() {
    const languages = await prismaClient.language.findMany({
      include: { countries: { select: { country: true } } },
      orderBy: { countries: { _count: 'desc' } },
    });
    return languages.map((language) => {
      return { ...language, countries: language.countries.map(({ country }) => country) };
    });
  }

  async getLanguage(code: string) {
    const language = await prismaClient.language.findFirstOrThrow({
      include: { countries: { select: { country: true } } },
      where: { code },
    });
    return { ...language, countries: language.countries.map(({ country }) => country) };
  }
}
