import { Country } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';
import { CountryGoogleTrends, CountryPassports } from './countries.types';

export class CountriesService {
  async getCountries(): Promise<Country[]> {
    const countries: Country[] = await prismaClient.country.findMany();
    return countries;
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

  async getPassports(): Promise<Pick<Country, CountryPassports>[]> {
    const countries: Pick<Country, CountryPassports>[] = await prismaClient.country.findMany({
      select: {
        commonName: true,
        cca2: true,
        cca3: true,
        passportGlobalRank: true,
        passportIndividualRank: true,
        passportMobilityScore: true,
      },
      where: { passportGlobalRank: { not: 0 } },
      orderBy: { passportIndividualRank: 'asc' },
    });
    return countries;
  }

  async getPassport(code: string): Promise<Pick<Country, CountryPassports | 'passportRequirements'>> {
    const country: Pick<Country, CountryPassports | 'passportRequirements'> =
      await prismaClient.country.findFirstOrThrow({
        select: {
          commonName: true,
          cca2: true,
          cca3: true,
          passportGlobalRank: true,
          passportIndividualRank: true,
          passportMobilityScore: true,
          passportRequirements: true,
        },
        where: { OR: [{ cca2: code }, { cca3: code }] },
      });
    return country;
  }
}
