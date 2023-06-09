import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const HOME_QUERY: DocumentNode = gql`
  query HOME_QUERY(
    $days: Int
    $from: String!
    $to: String!
    $amount: Float
    $base: String
    $limit: Int
    $pageSize: Int
    $country: String
    $maxResults: Int
  ) {
    cities {
      id
      city
      timezone
      latitude
      longitude
    }
    google {
      ranks {
        rank
        query
        count
      }
    }
    news(country: $country) {
      headlines(pageSize: $pageSize) {
        title
        author
        url
        urlToImage
        source {
          name
        }
      }
    }
    passports(limit: $limit) {
      countryCode
      globalRank
      mobilityScore
      individualRank
      country {
        commonName
        cca2
        cca3
      }
    }
    rates(amount: $amount, base: $base) {
      code
      rate
    }
    history(days: $days, from: $from, to: $to) {
      date
      from
      to
    }
    youtube(maxResults: $maxResults) {
      videos {
        id
        title
        channelTitle
        thumbnails {
          default {
            url
          }
          medium {
            url
          }
          high {
            url
          }
          standard {
            url
          }
          maxres {
            url
          }
        }
      }
    }
  }
`;
