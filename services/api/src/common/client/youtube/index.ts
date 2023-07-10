import { farfetch } from '../../libs/farfetch';
import { YouTubeCategoriesResponse, YouTubeVideosResponse } from './types';

export class YouTubeClient {
  private base = 'https://www.googleapis.com/youtube/v3';
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public async getCategories(
    regionCode = 'US'
  ): Promise<YouTubeCategoriesResponse> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('key', this.key);
    urlSearchParams.set('part', 'snippet');
    urlSearchParams.set('regionCode', regionCode);
    const url = `${this.base}/videoCategories?${urlSearchParams.toString()}`;
    return farfetch<YouTubeCategoriesResponse>(url);
  }

  public async getVideos({
    maxResults = 10,
    regionCode = '',
    trending = true,
    videoCategoryId = '',
  }: {
    maxResults: number;
    regionCode: string;
    trending: boolean;
    videoCategoryId: string;
  }): Promise<YouTubeVideosResponse> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('key', this.key);
    urlSearchParams.set('part', 'snippet');
    if (trending) urlSearchParams.set('chart', 'mostPopular');
    if (regionCode !== '') urlSearchParams.set('regionCode', regionCode);
    if (videoCategoryId !== '')
      urlSearchParams.set('videoCategoryId', videoCategoryId);
    if (maxResults) urlSearchParams.set('maxResults', maxResults.toString());
    const url = `${this.base}/videos?${urlSearchParams.toString()}`;
    return farfetch<YouTubeVideosResponse>(url);
  }
}
