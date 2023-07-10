export type YouTubeCategoriesResponse = {
  items: VideoCategoryItem[];
};

export type YouTubeCategoryItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    assignable: boolean;
    channelId: string;
  };
};

export type YouTubeVideosResponse = {
  items: VideoItem[];
};

export type YouTubeVideoItem = {
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
