import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const PASSPORTS_QUERY: DocumentNode = gql`
  query PASSPORTS_QUERY {
    passports {
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
  }
`;
