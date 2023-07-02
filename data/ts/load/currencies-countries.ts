import { PrismaClient } from '@prisma/client';
import countries from '../../json/transformed/countries.json';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    for (const country of countries) {
      const { code: countryCode = '', currencyCodes = [] } = country;
      for (const currencyCode of currencyCodes) {
        await prismaClient.currenciesInCountries.upsert({
          create: { countryCode, currencyCode },
          update: { countryCode, currencyCode },
          where: { currencyCode_countryCode: { countryCode, currencyCode } },
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
