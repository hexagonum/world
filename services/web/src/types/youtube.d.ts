export type YouTube = {
  categories: YouTubeCategory[];
  videos: YouTubeVideo[];
};

export type YouTubeCategory = {
  id: string;
  title: string;
};

export type YouTubeVideo = {
  id: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  thumbnails: YouTubeThumbnails;
};

export type YouTubeThumbnails = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
  maxres: Thumbnail;
};

export type YouTubeThumbnail = { url: string; width: number; height: number };
