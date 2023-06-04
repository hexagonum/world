import { Country } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class CountriesService {
  async getCountries() {
    const countries = await prismaClient.country.findMany({
      include: {
        currencies: { select: { currency: true } },
        languages: { select: { language: true } },
        organizations: { select: { organization: true } },
        googleTrends: { select: { queries: true } },
      },
    });
    return countries.map((country) => {
      const googleTrends: string[] = country.googleTrends.map(({ queries }) => queries)[0] ?? [];
      return {
        ...country,
        currencies: country.currencies.map(({ currency }) => currency),
        languages: country.languages.map(({ language }) => language),
        organizations: country.organizations.map(({ organization }) => organization),
        googleTrends,
      };
    });
  }

  async getCountry(code: string): Promise<Country> {
    const country: Country = await prismaClient.country.findFirstOrThrow({
      where: { OR: [{ code }, { cca2: code }, { cca3: code }] },
    });
    return country;
  }
}
