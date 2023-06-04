import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const CITIES_QUERY: DocumentNode = gql`
  query CITIES_QUERY($countryCode: String) {
    cities(countryCode: $countryCode) {
      state
      city
      latitude
      longitude
      timezone
      country {
        commonName
      }
    }
  }
`;
