import { gql } from '@apollo/client';

export const CURRENCY_QUERY = gql`
  query CURRENCY_QUERY($code: String!) {
    currency(code: $code) {
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
