import { DocumentNode, gql } from '@apollo/client';

export const CURRENCIES_QUERY: DocumentNode = gql`
  query CURRENCIES_QUERY {
    currencies {
      code
      name
      symbol
      countries {
        commonName
        cca2
        cca3
        region
        subregion
        population
      }
    }
  }
`;

export const CURRENCY_QUERY: DocumentNode = gql`
  query CURRENCY_QUERY($code: String!) {
    currency(code: $code) {
      code
      name
      countries {
        cca2
        cca3
        commonName
        region
        subregion
        population
      }
    }
  }
`;
