import { prismaClient } from '../../common/libs/prisma';

export class OrganizationsService {
  async getOrganizations() {
    const organizations = await prismaClient.organization.findMany({
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
    const organization = await prismaClient.organization.findFirstOrThrow({
      include: { countries: { select: { country: true } } },
      where: { code },
    });
    return {
      ...organization,
      countries: organization.countries.map(({ country }) => country),
    };
  }
}
