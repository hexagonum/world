import { Prisma, PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../../common/libs/prisma';

export class CitiesService {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = getPrismaClient();
  }

  async getCities({ countryCode = '' }: { countryCode: string }) {
    let where: Prisma.CityWhereInput = {
      latitude: { not: { equals: 0 } },
      longitude: { not: { equals: 0 } },
      timezone: { not: { equals: 0 } },
    };
    if (countryCode.length > 0) where = { ...where, countryCode };
    const cities = await this.prismaClient.city.findMany({
      include: { country: true },
      where,
    });
    return cities;
  }
}
