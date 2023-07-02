import { PrismaClient } from '@prisma/client';
import timezones from '../../json/transformed/timezones.json';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    for (const timezone of timezones) {
      const { code = '', name = '', offset = '', utcOffset = '' } = timezone;
      await prismaClient.timezone.upsert({
        create: { code, name, offset, utcOffset },
        update: { code, name, offset, utcOffset },
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
