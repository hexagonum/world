import { PrismaClient } from '@prisma/client';
import countries from '../../json/raw/countries.json';
import passports from '../../json/raw/passports/passports.json';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    for (const passport of passports) {
      const { cca2: cca2Passport, individualRank, globalRank, mobilityScore } = passport;
      const country: any = countries.find(({ cca2 }) => cca2 === cca2Passport) ?? {};
      const { cca3 = '' } = country;
      if (!cca3) return;
      await prismaClient.passport.upsert({
        create: { countryCode: cca3, globalRank, individualRank, mobilityScore },
        update: { countryCode: cca3, globalRank, individualRank, mobilityScore },
        where: { countryCode: cca3 },
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prismaClient.$disconnect();
  }
};

main().catch(console.error);
