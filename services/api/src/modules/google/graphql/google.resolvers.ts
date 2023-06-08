import { GoogleTrend } from '@prisma/client';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';
import { GoogleRank } from '../google.types';

export const resolvers = {
  Query: {
    google(_: unknown, { limit = 10, countryCode = '' }: { countryCode: string; limit: number }) {
      return { countryCode, limit };
    },
  },
  Google: {
    trends: async ({ countryCode = '' }: { countryCode: string }): Promise<GoogleTrend[]> => {
      const urlSearchParams = new URLSearchParams();
      if (countryCode) urlSearchParams.set('countryCode', countryCode);
      return await farfetch<GoogleTrend[]>(`${BASE_API}/google/trends?${urlSearchParams.toString()}`);
    },
    ranks: async ({ limit = 10 }: { limit: number }): Promise<GoogleRank[]> => {
      const urlSearchParams = new URLSearchParams();
      if (limit) urlSearchParams.set('limit', limit.toString());
      return await farfetch<GoogleRank[]>(`${BASE_API}/google/ranks?${urlSearchParams.toString()}`);
    },
  },
};
