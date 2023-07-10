export type YouTubeCategory = {
  id: string;
  title: string;
  channelId: string;
};

export type Thumbnails = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
  maxres: Thumbnail;
};

export type Thumbnail = { url: string; width: number; height: number };

export type YouTubeVideo = {
  id: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  thumbnails: Thumbnails;
};
