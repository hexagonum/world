import { PrismaClient } from '@prisma/client';
import countries from '../../json/transformed/countries.json';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    for (const country of countries) {
      const {
        code = '',
        commonName = '',
        officialName = '',
        cca2 = '',
        cca3 = '',
        ccn3 = '',
        cioc = '',
        fifa = '',
        status = '',
        independent = false,
        unMember = false,
        startOfWeek = '',
        latitude = 0,
        longitude = 0,
        topLevelDomains = [],
        capital = [],
        alternativeSpellings = [],
        continents = [],
        borders = [],
        region = '',
        subregion = '',
        flag = '',
        flagPNG = '',
        flagSVG = '',
        area = 0,
        population = 0,
        density = 0,
        googleMaps = '',
        timezones = [],
      } = country;
      const data = {
        code,
        commonName,
        officialName,
        cca2,
        cca3,
        ccn3,
        cioc,
        fifa,
        status,
        independent,
        unMember,
        startOfWeek,
        latitude,
        longitude,
        topLevelDomains,
        capital,
        alternativeSpellings,
        continents,
        borders,
        region,
        subregion,
        flag,
        flagPNG,
        flagSVG,
        area,
        population,
        density,
        googleMaps,
        timezones,
      };
      await prismaClient.country.upsert({
        create: data,
        update: data,
        where: { code },
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prismaClient.$disconnect();
  }
};

main().catch(console.error);
