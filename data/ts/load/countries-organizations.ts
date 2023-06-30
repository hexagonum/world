import { PrismaClient } from '@prisma/client';
import countries from '../../json/transformed/countries.json';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    for (const country of countries) {
      const { code: countryCode = '', organizationCodes = [] } = country;
      for (const organizationCode of organizationCodes) {
        await prismaClient.countriesInOrganizations.upsert({
          create: { countryCode, organizationCode },
          update: { countryCode, organizationCode },
          where: {
            countryCode_organizationCode: { countryCode, organizationCode },
          },
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
