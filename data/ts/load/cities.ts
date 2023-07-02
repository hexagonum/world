import { PrismaClient } from '@prisma/client';
import cities from '../../json/raw/cities.json';

const prismaClient = new PrismaClient();

const main = async () => {
  try {
    await prismaClient.$connect();
    await prismaClient.city.deleteMany();
    for (const c of cities) {
      const {
        country_code: countryCode = '',
        region = '',
        subregion = '',
        state = '',
        state_code: stateCode = '',
        state_level: stateLevel = '',
        city = '',
        city_code: cityCode = '',
        city_level: cityLevel = '',
        latitude = 0,
        longitude = 0,
        timezone = 0,
      } = c;
      console.log(city, state, countryCode);
      await prismaClient.city.create({
        data: {
          countryCode,
          region,
          subregion,
          state,
          stateCode,
          stateLevel,
          city,
          cityCode,
          cityLevel,
          latitude: parseFloat(latitude.toString() || '0') || 0,
          longitude: parseFloat(longitude.toString() || '0') || 0,
          timezone: parseFloat(timezone.toString() || '0') || 0,
        },
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prismaClient.$disconnect();
  }
};

main().catch(console.error);
