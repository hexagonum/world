import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const ORGANIZATIONS_QUERY: DocumentNode = gql`
  query ORGANIZATIONS_QUERY {
    organizations {
      code
      name
      countries {
        cca2
        cca3
        commonName
      }
    }
  }
`;

export const ORGANIZATION_QUERY: DocumentNode = gql`
  query ORGANIZATION_QUERY($code: String!) {
    organization(code: $code) {
      code
      name
      countries {
        cca2
        cca3
        commonName
        region
      }
    }
  }
`;
