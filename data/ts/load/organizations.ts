import { PrismaClient } from '@prisma/client';
import organizations from '../../json/raw/organizations.json';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    for (const organization of organizations) {
      const { code = '', name = '' } = organization;
      await prismaClient.organization.upsert({
        create: { code, name },
        update: { code, name },
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
