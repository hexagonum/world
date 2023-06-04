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

export const COUNTRIES_AREA_QUERY: DocumentNode = gql`
  query COUNTRIES_AREA_QUERY {
    countries {
      commonName
      cca3
      area
    }
  }
`;

export const COUNTRIES_BORDERS_QUERY: DocumentNode = gql`
  query COUNTRIES_BORDERS_QUERY {
    countries {
      cca3
      code
      commonName
      borders
    }
  }
`;

export const COUNTRIES_CURRENCIES_QUERY: DocumentNode = gql`
  query COUNTRIES_CURRENCIES_QUERY {
    countries {
      commonName
      cca3
      currencies {
        code
        name
        symbol
      }
    }
  }
`;

export const COUNTRIES_DENSITY_QUERY: DocumentNode = gql`
  query COUNTRIES_DENSITY_QUERY {
    countries {
      commonName
      cca3
      density
    }
  }
`;

export const COUNTRIES_GOOGLE_TRENDS_QUERY: DocumentNode = gql`
  query COUNTRIES_GOOGLE_TRENDS_QUERY {
    countries {
      code
      cca2
      cca3
      region
      subregion
      commonName
      googleTrends
    }
  }
`;

export const COUNTRIES_LANGUAGES_QUERY: DocumentNode = gql`
  query COUNTRIES_LANGUAGES_QUERY {
    countries {
      commonName
      cca3
      languages {
        code
        name
      }
    }
  }
`;

export const COUNTRIES_ORGANIZATIONS_QUERY: DocumentNode = gql`
  query COUNTRIES_ORGANIZATIONS_QUERY {
    countries {
      commonName
      cca3
      organizations {
        code
        name
      }
    }
  }
`;

export const COUNTRIES_POPULATION_QUERY: DocumentNode = gql`
  query COUNTRIES_POPULATION_QUERY {
    countries {
      commonName
      cca3
      population
    }
  }
`;

export const COUNTRIES_TIMEZONES_QUERY: DocumentNode = gql`
  query COUNTRIES_TIMEZONES_QUERY {
    countries {
      code
      commonName
      region
      timezones
    }
  }
`;

export const COUNTRIES_TOP_LEVEL_DOMAINS_QUERY: DocumentNode = gql`
  query COUNTRIES_TOP_LEVEL_DOMAINS_QUERY {
    countries {
      commonName
      cca3
      topLevelDomains
    }
  }
`;

export const COUNTRY_QUERY: DocumentNode = gql`
  query COUNTRY_QUERY {
    country {
      cca2
      cca3
      fifa
    }
  }
`;
