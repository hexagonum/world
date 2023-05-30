import { Country } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';
import { CountryGoogleTrends } from './countries.types';

export class CountriesService {
  async getCountries(): Promise<Country[]> {
    const countries: Country[] = await prismaClient.country.findMany();
    return countries;
  }

  async getCountry(code: string): Promise<Country> {
    const country: Country = await prismaClient.country.findFirstOrThrow({ where: { code } });
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
