import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';
import { YouTubeCategory } from '../youtube.types';

export const resolvers = {
  Query: {
    youtube: (_parent: unknown, { categoryId = '', countryCode = '' }: { categoryId: string; countryCode: string }) => {
      return { categoryId, countryCode };
    },
  },
  YouTube: {
    categories: async ({ countryCode }: { countryCode: string }) => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set('countryCode', countryCode);
      const url = `${BASE_API}/youtube/categories?${urlSearchParams.toString()}`;
      const categories: YouTubeCategory[] = await farfetch<YouTubeCategory[]>(url);
      return categories.map((category: YouTubeCategory) => ({ ...category, countryCode }));
    },
    videos: async ({ categoryId, countryCode }: { categoryId: string; countryCode: string }) => {
      const urlSearchParams = new URLSearchParams();
      if (categoryId) urlSearchParams.set('categoryId', categoryId);
      if (countryCode) urlSearchParams.set('countryCode', countryCode);
      const url = `${BASE_API}/youtube/videos?${urlSearchParams.toString()}`;
      console.log(url);
      return farfetch(url);
    },
  },
  YouTubeCategory: {
    videos: async ({ id: categoryId, countryCode }: { id: string; countryCode: string }) => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set('categoryId', categoryId);
      urlSearchParams.set('countryCode', countryCode);
      const url = `${BASE_API}/youtube/videos?${urlSearchParams.toString()}`;
      console.log(url);
      return farfetch(url);
    },
  },
};
