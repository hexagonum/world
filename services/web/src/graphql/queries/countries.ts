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
      commonName
      cca3
      borders
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

export const COUNTRIES_POPULATION_QUERY: DocumentNode = gql`
  query COUNTRIES_POPULATION_QUERY {
    countries {
      commonName
      cca3
      population
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
