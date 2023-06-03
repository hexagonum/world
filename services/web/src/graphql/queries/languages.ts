import { DocumentNode, gql } from '@apollo/client';

export const LANGUAGES_QUERY: DocumentNode = gql`
  query LANGUAGES_QUERY {
    languages {
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

export const LANGUAGE_QUERY: DocumentNode = gql`
  query LANGUAGE_QUERY($code: String!) {
    language(code: $code) {
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
