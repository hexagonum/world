import { prismaClient } from '../../common/libs/prisma';

export class CountriesService {
  async getCountries({
    codes = '',
    timezone = '',
  }: {
    codes: string;
    timezone: string;
  }) {
    let where = {};
    if (codes.length > 0)
      where = {
        ...where,
        OR: [
          { code: { in: codes.split(',') } },
          { cca2: { in: codes.split(',') } },
          { cca3: { in: codes.split(',') } },
          { fifa: { in: codes.split(',') } },
        ],
      };
    if (timezone.length > 0) {
      where = { ...where, timezones: { has: timezone } };
    }
    console.log('Where', where);
    const countries = await prismaClient.country.findMany({
      include: {
        cities: {
          select: {
            state: true,
            city: true,
            latitude: true,
            longitude: true,
            timezone: true,
          },
          where: {
            latitude: { not: { equals: 0 } },
            longitude: { not: { equals: 0 } },
            timezone: { not: { equals: 0 } },
          },
          orderBy: { timezone: 'asc' },
        },
        currencies: { select: { currency: true } },
        languages: { select: { language: true } },
        organizations: { select: { organization: true } },
        googleTrends: { select: { queries: true } },
      },
      where,
    });
    return countries.map((country) => {
      const googleTrends: string[] =
        country.googleTrends.map(
          ({ queries }: { queries: string[] }) => queries
        )[0] ?? [];
      return {
        ...country,
        currencies: country.currencies.map(({ currency }) => currency),
        languages: country.languages.map(({ language }) => language),
        organizations: country.organizations.map(
          ({ organization }) => organization
        ),
        googleTrends,
      };
    });
  }

  async getCountry(code: string) {
    const codeUppercase = code.toUpperCase();
    const country = await prismaClient.country.findFirstOrThrow({
      include: {
        cities: {
          select: {
            state: true,
            city: true,
            latitude: true,
            longitude: true,
            timezone: true,
          },
          where: {
            latitude: { not: { equals: 0 } },
            longitude: { not: { equals: 0 } },
            timezone: { not: { equals: 0 } },
          },
          orderBy: { timezone: 'asc' },
        },
        currencies: { select: { currency: true } },
        languages: { select: { language: true } },
        organizations: { select: { organization: true } },
        googleTrends: { select: { queries: true } },
      },
      where: {
        OR: [
          { code: codeUppercase },
          { cca2: codeUppercase },
          { cca3: codeUppercase },
          { fifa: codeUppercase },
        ],
      },
    });
    const googleTrends: string[] =
      country.googleTrends.map(({ queries }) => queries)[0] ?? [];
    return {
      ...country,
      currencies: country.currencies.map(({ currency }) => currency),
      languages: country.languages.map(({ language }) => language),
      organizations: country.organizations.map(
        ({ organization }) => organization
      ),
      googleTrends,
    };
  }
}
