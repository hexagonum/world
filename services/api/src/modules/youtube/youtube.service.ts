import { YouTubeClient } from '../../common/client/youtube';
import { API_KEY_YOUTUBE_V3 } from '../../common/environments';
import { logger } from '../../common/libs/logger';
import { getJSON, setJSON } from '../../common/database/redis';
import { YouTubeCategory, YouTubeVideo } from './youtube.types';

export class YouTubeService {
  private youTubeClient: YouTubeClient;

  constructor() {
    this.youTubeClient = new YouTubeClient(API_KEY_YOUTUBE_V3);
  }

  async getVideoCategories(
    { regionCode = 'US' }: { regionCode: string } = { regionCode: 'US' }
  ): Promise<YouTubeCategory[]> {
    const redisKey: string =
      regionCode !== ''
        ? `youtube-categories-${regionCode}`
        : 'youtube-categories';
    const cacheCategories: YouTubeCategory[] | null = await getJSON<
      YouTubeCategory[]
    >(redisKey);
    if (cacheCategories) return cacheCategories;
    const response = await this.youTubeClient.getCategories(regionCode);
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
    maxResults = 50,
    regionCode = '',
    trending = true,
    videoCategoryId = '',
  }: {
    maxResults: number;
    regionCode: string;
    trending: boolean;
    videoCategoryId: string;
  }): Promise<YouTubeVideo[]> {
    const response = await this.youTubeClient.getVideos({
      maxResults,
      regionCode,
      trending,
      videoCategoryId,
    });
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
