export type VideoCategoriesResponse = {
  items: VideoCategoryItem[];
};

export type VideoCategoryItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    assignable: boolean;
    channelId: string;
  };
};

export type YouTubeCategory = {
  id: string;
  title: string;
  channelId: string;
};

export type VideosResponse = {
  items: VideoItem[];
};

export type VideoItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
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
