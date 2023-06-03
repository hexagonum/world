import { Country } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';
import { CountryGoogleTrends } from './countries.types';

export class CountriesService {
  async getCountries() {
    const countries = await prismaClient.country.findMany({
      include: {
        currencies: { select: { currency: true } },
        languages: { select: { language: true } },
        organizations: { select: { organization: true } },
      },
    });
    return countries.map((country) => {
      return {
        ...country,
        currencies: country.currencies.map(({ currency }) => currency),
        languages: country.languages.map(({ language }) => language),
        organizations: country.organizations.map(({ organization }) => organization),
      };
    });
  }

  async getCountry(code: string): Promise<Country> {
    const country: Country = await prismaClient.country.findFirstOrThrow({
      where: { OR: [{ cca2: code }, { cca3: code }] },
    });
    return country;
  }

  async getGoogleTrends(): Promise<Pick<Country, CountryGoogleTrends>[]> {
    const countries: Pick<Country, CountryGoogleTrends>[] = await prismaClient.country.findMany({
      select: { commonName: true, region: true, subregion: true, googleTrends: true },
      where: { googleTrends: { isEmpty: false } },
    });
    return countries;
  }
}
