import { Organization } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class OrganizationsService {
  async getOrganizations(): Promise<Organization[]> {
    const organizations: Organization[] = await prismaClient.organization.findMany({
      include: {
        countries: {
          select: { country: { select: { commonName: true, region: true, subregion: true, population: true } } },
        },
      },
    });
    return organizations;
  }

  async getOrganization(code: string): Promise<Organization> {
    const organization: Organization = await prismaClient.organization.findFirstOrThrow({
      where: { code },
      include: {
        countries: {
          select: { country: { select: { commonName: true, region: true, subregion: true, population: true } } },
        },
      },
    });
    return organization;
  }
}
