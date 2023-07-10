import { API_KEY_YOUTUBE_V3 } from '../../common/environments';
import { farfetch } from '../../common/libs/farfetch';
import { logger } from '../../common/libs/logger';
import { getJSON, setJSON } from '../../common/libs/redis';
import {
  VideoCategoriesResponse,
  VideosResponse,
  YouTubeCategory,
  YouTubeVideo,
} from './youtube.types';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export class YouTubeService {
  async getVideoCategories(
    { regionCode = 'US' }: { regionCode: string } = { regionCode: 'US' }
  ): Promise<YouTubeCategory[]> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('key', API_KEY_YOUTUBE_V3);
    urlSearchParams.set('part', 'snippet');
    urlSearchParams.set('regionCode', regionCode);
    const redisKey = `youtube-categories-${regionCode}`;
    const cacheCategories: YouTubeCategory[] | null = await getJSON<
      YouTubeCategory[]
    >(redisKey);
    if (cacheCategories) return cacheCategories;
    const url = `${BASE_URL}/videoCategories?${urlSearchParams.toString()}`;
    const response: VideoCategoriesResponse =
      await farfetch<VideoCategoriesResponse>(url);
    const categories: YouTubeCategory[] = response.items.map(
      ({ id, snippet: { title = '', channelId = '' } }) => ({
        id,
        title,
        channelId,
      })
    );
    setJSON(redisKey, categories).catch(logger.error);
    return categories;
  }

  async getVideos({
    categoryId = '',
    regionCode = '',
    maxResults = 50,
  }): Promise<YouTubeVideo[]> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('key', API_KEY_YOUTUBE_V3);
    urlSearchParams.set('part', 'snippet');
    urlSearchParams.set('chart', 'mostPopular');
    if (regionCode) urlSearchParams.set('regionCode', regionCode);
    if (categoryId) urlSearchParams.set('videoCategoryId', categoryId);
    if (maxResults) urlSearchParams.set('maxResults', maxResults.toString());
    const url = `${BASE_URL}/videos?${urlSearchParams.toString()}`;
    const response = await farfetch<VideosResponse>(url);
    return response.items.map(
      ({
        id = '',
        snippet: {
          title = '',
          description = '',
          channelId = '',
          channelTitle = '',
          thumbnails,
        },
      }) => {
        return { id, title, description, channelId, channelTitle, thumbnails };
      }
    );
  }
}
