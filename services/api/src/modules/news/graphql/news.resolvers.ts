import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';
import { Article, Source } from '../news.types';

export const resolvers = {
  Query: {
    news: (_parent: unknown, { country }: { country: string }) => {
      return { country };
    },
  },
  News: {
    headlines: async ({ country = '' }, { pageSize = 10 }: { pageSize: number }): Promise<Article[]> => {
      const urlSearchParams = new URLSearchParams();
      if (country) urlSearchParams.set('country', country);
      if (pageSize) urlSearchParams.set('pageSize', pageSize.toString());
      return await farfetch<Article[]>(`${BASE_API}/news/headlines?${urlSearchParams.toString()}`);
    },
    sources: async ({ country = '' }): Promise<Source[]> => {
      const urlSearchParams = new URLSearchParams();
      if (country) urlSearchParams.set('country', country);
      return await farfetch<Source[]>(`${BASE_API}/news/sources?${urlSearchParams.toString()}`);
    },
  },
};
