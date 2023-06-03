import { Timezone } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    timezones: async (): Promise<Timezone[]> => {
      return await farfetch<Timezone[]>(`${BASE_API}/timezones`);
    },
  },
};
