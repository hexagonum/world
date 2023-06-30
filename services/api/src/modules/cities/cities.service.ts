import { Prisma } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class CitiesService {
  async getCities({ countryCode = '' }: { countryCode: string }) {
    let where: Prisma.CityWhereInput = {
      latitude: { not: { equals: 0 } },
      longitude: { not: { equals: 0 } },
      timezone: { not: { equals: 0 } },
    };
    if (countryCode.length > 0) where = { ...where, countryCode };
    const cities = await prismaClient.city.findMany({
      include: { country: true },
      where,
    });
    return cities;
  }
}
