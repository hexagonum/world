import { PrismaClient } from '@prisma/client';
import countries from '../../json/transformed/countries.json';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    for (const country of countries) {
      const { code: countryCode = '', languageCodes = [] } = country;
      for (const languageCode of languageCodes) {
        await prismaClient.languagesInCountries.upsert({
          create: { countryCode, languageCode },
          update: { countryCode, languageCode },
          where: { languageCode_countryCode: { countryCode, languageCode } },
        });
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prismaClient.$disconnect();
  }
};

main().catch(console.error);
