import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const HOME_QUERY: DocumentNode = gql`
  query HOME_QUERY($amount: Float, $base: String, $limit: Int) {
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
  }
`;
