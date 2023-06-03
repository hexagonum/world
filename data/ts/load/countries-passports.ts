import requirements from '../../json/raw/passports/requirements.json';
import countries from '../../json/raw/countries.json';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    const cca2Froms: string[] = Object.keys(requirements);
    for (const cca2From of cca2Froms) {
      const fromCountry: any = countries.find(({ cca2 }: { cca2: string }) => cca2 === cca2From) ?? {};
      const { cca3: cca3From = '' } = fromCountry;
      const toRequirements = (requirements as Record<string, any>)[cca2From];
      const cca2Tos: string[] = Object.keys(toRequirements);
      for (const cca2To of cca2Tos) {
        const toCountry: any = countries.find(({ cca2 }: { cca2: string }) => cca2 === cca2To) ?? {};
        const { cca3: cca3To = '' } = toCountry;
        const requirement = toRequirements[cca2To];
        if (!cca3To) return;
        await prismaClient.passportRequirement.upsert({
          create: { passportCode: cca3From, countryCode: cca3To, requirement },
          update: { passportCode: cca3From, countryCode: cca3To, requirement },
          where: { passportCode_countryCode: { passportCode: cca3From, countryCode: cca3To } },
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
