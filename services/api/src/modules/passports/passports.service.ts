import { Passport, PassportRequirement, PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../../common/libs/prisma';

export class PassportsService {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = getPrismaClient();
  }

  async getPassports({ limit = 0 }: { limit: number }): Promise<Passport[]> {
    const passports: Passport[] = await this.prismaClient.passport.findMany({
      include: {
        country: {
          select: {
            commonName: true,
            cca2: true,
            cca3: true,
            region: true,
            subregion: true,
          },
        },
      },
      orderBy: { individualRank: 'asc' },
      take: limit > 0 ? limit : undefined,
    });
    return passports;
  }

  async getPassport(code: string): Promise<PassportRequirement[]> {
    const countrySelect = {
      commonName: true,
      cca2: true,
      cca3: true,
      region: true,
      subregion: true,
    };
    const passportRequirement: PassportRequirement[] =
      await this.prismaClient.passportRequirement.findMany({
        include: {
          country: { select: countrySelect },
          passport: {
            select: {
              countryCode: true,
              country: { select: countrySelect },
              globalRank: true,
              individualRank: true,
              mobilityScore: true,
            },
          },
        },
        where: { passportCode: code },
      });
    return passportRequirement;
  }
}
