import { API_KEY_YOUTUBE_V3 } from '../../common/environments';
import { farfetch } from '../../common/libs/farfetch';
import { VideoCategoriesResponse, VideosResponse, YouTubeCategory, YouTubeVideo } from './youtube.types';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export class YouTubeService {
  async getVideoCategories(regionCode = 'US'): Promise<YouTubeCategory[]> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('key', API_KEY_YOUTUBE_V3);
    urlSearchParams.set('part', 'snippet');
    urlSearchParams.set('regionCode', regionCode);
    const url = `${BASE_URL}/videoCategories?${urlSearchParams.toString()}`;
    const response = await farfetch<VideoCategoriesResponse>(url);
    return response.items.map(({ id, snippet: { title = '', channelId = '' } }) => {
      return { id, title, channelId };
    });
  }

  async getVideos({ categoryId = '', regionCode = 'US' }): Promise<YouTubeVideo[]> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('key', API_KEY_YOUTUBE_V3);
    urlSearchParams.set('part', 'snippet');
    urlSearchParams.set('maxResults', '50');
    urlSearchParams.set('chart', 'mostPopular');
    if (regionCode) urlSearchParams.set('regionCode', regionCode);
    if (categoryId) urlSearchParams.set('videoCategoryId', categoryId);
    const url = `${BASE_URL}/videos?${urlSearchParams.toString()}`;
    const response = await farfetch<VideosResponse>(url);
    return response.items.map(
      ({ id = '', snippet: { title = '', description = '', channelId = '', channelTitle = '', thumbnails } }) => {
        return { id, title, description, channelId, channelTitle, thumbnails };
      }
    );
  }
}
