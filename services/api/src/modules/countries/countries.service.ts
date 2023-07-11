import { Prisma, PrismaClient } from '@prisma/client';
import { logger } from '../../common/libs/logger';
import { getPrismaClient } from '../../common/database/prisma';

export class CountriesService {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = getPrismaClient();
  }

  async getCountries({
    codes = '',
    timezone = '',
  }: {
    codes: string;
    timezone: string;
  }) {
    let where: Prisma.CountryWhereInput = {};
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
    logger.info(`getCountries where=${JSON.stringify(where)}`);
    const countries = await this.prismaClient.country.findMany({
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
    const country = await this.prismaClient.country.findFirstOrThrow({
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

  async searchCountries({ query }: { query: string }) {
    let where: Prisma.CountryWhereInput = {};
    if (query != '') {
      where = {
        OR: [
          { code: { contains: query, mode: 'insensitive' } },
          { cca2: { contains: query, mode: 'insensitive' } },
          { cca3: { contains: query, mode: 'insensitive' } },
          { fifa: { contains: query, mode: 'insensitive' } },
          { commonName: { contains: query, mode: 'insensitive' } },
          { officialName: { contains: query, mode: 'insensitive' } },
        ],
      };
    }
    const [total = 0, countries = []] = await this.prismaClient.$transaction([
      this.prismaClient.country.count({ where }),
      this.prismaClient.country.findMany({
        where,
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
      }),
    ]);

    return {
      total,
      countries: countries.map((country) => {
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
      }),
    };
  }
}
