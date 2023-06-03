import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const ORGANIZATIONS_QUERY: DocumentNode = gql`
  query ORGANIZATIONS_QUERY {
    ORGANIZATIONS {
      code
      name
    }
  }
`;
