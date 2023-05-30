import { PrismaClient } from '@prisma/client';
import languages from '../../json/raw/languages.json';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    for (const language of languages) {
      const { code = '', name = '' } = language;
      await prismaClient.language.upsert({
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
