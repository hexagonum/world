import { Organization } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    organizations: async (): Promise<Organization[]> => {
      return await farfetch<Organization[]>(`${BASE_API}/organizations`);
    },
  },
};
