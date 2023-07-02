import { PrismaClient } from '@prisma/client';
import currencies from '../../json/raw/currencies.json';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    for (const currency of currencies) {
      const { code = '', name = '', symbol = '' } = currency;
      await prismaClient.currency.upsert({
        create: { code, name, symbol },
        update: { code, name, symbol },
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
