import { Organization } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class OrganizationsService {
  async getOrganizations(): Promise<Organization[]> {
    const organizations: Organization[] = await prismaClient.organization.findMany();
    return organizations;
  }
}
