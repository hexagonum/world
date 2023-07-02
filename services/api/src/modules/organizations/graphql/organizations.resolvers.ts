import { Country, Organization } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

type ResponseOrganization = Organization & { countries: Country[] };

export const resolvers = {
  Query: {
    organizations: async (): Promise<ResponseOrganization[]> => {
      return farfetch<ResponseOrganization[]>(`${BASE_API}/organizations`);
    },
    organization: async (
      _parent: unknown,
      { code }: { code: string }
    ): Promise<ResponseOrganization> => {
      return farfetch<ResponseOrganization>(
        `${BASE_API}/organizations/${code}`
      );
    },
  },
};
