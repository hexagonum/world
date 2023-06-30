import { Passport, PassportRequirement } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class PassportsService {
  async getPassports({ limit = 0 }: { limit: number }): Promise<Passport[]> {
    const passports: Passport[] = await prismaClient.passport.findMany({
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
      await prismaClient.passportRequirement.findMany({
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
