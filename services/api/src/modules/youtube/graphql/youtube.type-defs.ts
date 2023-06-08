export const typeDefs = `#graphql
  extend type Query {
    youtube(categoryId: String, countryCode: String, maxResults: Int): YouTube
  }

  type YouTube {
    categories: [YouTubeCategory]
    videos: [YouTubeVideo]
  }

  type YouTubeCategory {
    id: String
    title: String
    channelId: String
    videos: [YouTubeVideo]
  }

  type YouTubeVideo {
    id: String
    title: String
    description: String
    channelId: String
    channelTitle: String
    thumbnails: YouTubeThumbnails
  }

  type YouTubeThumbnails {
    default: YouTubeThumbnail
    medium: YouTubeThumbnail
    high: YouTubeThumbnail
    standard: YouTubeThumbnail
    maxres: YouTubeThumbnail
  }

  type YouTubeThumbnail {
    url: String
    width: Int
    height: Int
  }
`;
