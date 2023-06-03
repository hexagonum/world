import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const COUNTRIES_QUERY: DocumentNode = gql`
  query COUNTRIES_QUERY {
    countries {
      commonName
      cca2
      cca3
      fifa
      flag
      region
      subregion
    }
  }
`;
