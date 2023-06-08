import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const YOUTUBE_CATEGORIES_QUERY: DocumentNode = gql`
  query YOUTUBE_CATEGORIES_QUERY {
    youtube {
      categories {
        id
        title
      }
    }
  }
`;

export const YOUTUBE_VIDEOS_QUERY: DocumentNode = gql`
  query YOUTUBE_VIDEOS_QUERY($categoryId: String, $countryCode: String, $maxResults: Int) {
    youtube(categoryId: $categoryId, countryCode: $countryCode, maxResults: $maxResults) {
      videos {
        id
        title
        channelId
        channelTitle
        thumbnails {
          default {
            url
            width
            height
          }
          medium {
            url
            width
            height
          }
          high {
            url
            width
            height
          }
          standard {
            url
            width
            height
          }
          maxres {
            url
            width
            height
          }
        }
      }
    }
  }
`;
