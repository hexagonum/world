import { NewsArticle, NewsSource } from '../../../common/client/news/types';
import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';

export const resolvers = {
  Query: {
    news: (_parent: unknown, { country }: { country: string }) => {
      return { country };
    },
  },
  News: {
    headlines: async (
      { country = '' },
      { pageSize = 10 }: { pageSize: number }
    ): Promise<NewsArticle[]> => {
      const urlSearchParams = new URLSearchParams();
      if (country) urlSearchParams.set('country', country);
      if (pageSize) urlSearchParams.set('pageSize', pageSize.toString());
      return await farfetch<NewsArticle[]>(
        `${BASE_API}/news/headlines?${urlSearchParams.toString()}`
      );
    },
    sources: async ({ country = '' }): Promise<NewsSource[]> => {
      const urlSearchParams = new URLSearchParams();
      if (country) urlSearchParams.set('country', country);
      return await farfetch<NewsSource[]>(
        `${BASE_API}/news/sources?${urlSearchParams.toString()}`
      );
    },
  },
};
