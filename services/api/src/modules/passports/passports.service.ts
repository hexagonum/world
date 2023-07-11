import {
  Prisma,
  Passport,
  PassportRequirement,
  PrismaClient,
} from '@prisma/client';
import { getPrismaClient } from '../../common/database/prisma';

export class PassportsService {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = getPrismaClient();
  }

  async getPassports({
    limit = 0,
    query = '',
  }: {
    limit: number;
    query: string;
  }): Promise<{ total: number; passports: Passport[] }> {
    let where: Prisma.PassportWhereInput = {};
    if (query !== '') {
      where = {
        country: {
          OR: [
            { cca2: { contains: query, mode: 'insensitive' } },
            { cca3: { contains: query, mode: 'insensitive' } },
            { fifa: { contains: query, mode: 'insensitive' } },
            { commonName: { contains: query, mode: 'insensitive' } },
            { officialName: { contains: query, mode: 'insensitive' } },
          ],
        },
      };
    }
    const [total = 0, passports = []] = await this.prismaClient.$transaction([
      this.prismaClient.passport.count({ where }),
      this.prismaClient.passport.findMany({
        where,
        include: {
          country: {
            select: {
              cca2: true,
              cca3: true,
              fifa: true,
              commonName: true,
              officialName: true,
              region: true,
              subregion: true,
            },
          },
        },
        orderBy: { individualRank: 'asc' },
        take: limit > 0 ? limit : undefined,
      }),
    ]);
    return { total, passports };
  }

  async getPassport(
    code: string
  ): Promise<{ total: number; requirements: PassportRequirement[] }> {
    const countrySelect = {
      commonName: true,
      cca2: true,
      cca3: true,
      region: true,
      subregion: true,
    };
    const [total = 0, requirements = []] = await this.prismaClient.$transaction(
      [
        this.prismaClient.passportRequirement.count({
          where: { passportCode: code },
        }),
        this.prismaClient.passportRequirement.findMany({
          where: { passportCode: code },
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
        }),
      ]
    );

    return { total, requirements };
  }
}
