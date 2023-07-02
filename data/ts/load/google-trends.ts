import { PrismaClient } from '@prisma/client';
import trends from '../../json/transformed/google-trends.json';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    for (const trend of trends) {
      const { countryCode = '', queries = [] } = trend;
      await prismaClient.googleTrend.upsert({
        create: { countryCode, queries },
        update: { countryCode, queries },
        where: { countryCode: countryCode },
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prismaClient.$disconnect();
  }
};

main().catch(console.error);
