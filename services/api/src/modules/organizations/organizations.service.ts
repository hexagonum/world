import { PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../../common/libs/prisma';

export class OrganizationsService {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = getPrismaClient();
  }

  async getOrganizations() {
    const organizations = await this.prismaClient.organization.findMany({
      include: { countries: { select: { country: true } } },
      orderBy: { countries: { _count: 'desc' } },
    });
    return organizations.map((organization) => {
      return {
        ...organization,
        countries: organization.countries.map(({ country }) => country),
      };
    });
  }

  async getOrganization(code: string) {
    const organization = await this.prismaClient.organization.findFirstOrThrow({
      include: { countries: { select: { country: true } } },
      where: { code },
    });
    return {
      ...organization,
      countries: organization.countries.map(({ country }) => country),
    };
  }
}
