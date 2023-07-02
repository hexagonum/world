import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const FOOTBALL_AREAS_QUERY: DocumentNode = gql`
  query FOOTBALL_AREAS_QUERY {
    football {
      areas {
        id
        name
      }
    }
  }
`;

export const FOOTBALL_COMPETITIONS_QUERY: DocumentNode = gql`
  query FOOTBALL_COMPETITIONS_QUERY($filterOptions: FootballFilterOptions) {
    football(filterOptions: $filterOptions) {
      areas {
        id
        name
        competitions {
          id
          name
        }
      }
    }
  }
`;

export const FOOTBALL_TEAMS_QUERY: DocumentNode = gql`
  query FOOTBALL_TEAMS_QUERY($filterOptions: FootballFilterOptions) {
    football(filterOptions: $filterOptions) {
      areas {
        id
        name
        competitions {
          id
          name
          standings {
            position
            id
            name
            won
            draw
            lost
            points
            goalsFor
            goalsAgainst
            goalDifference
          }
        }
      }
    }
  }
`;

export const FOOTBALL_MATCHES_QUERY: DocumentNode = gql`
  query FOOTBALL_MATCHES_QUERY($filterOptions: FootballFilterOptions) {
    football(filterOptions: $filterOptions) {
      areas {
        id
        name
        competitions {
          id
          name
          standings {
            position
            id
            name
            won
            draw
            lost
            points
            goalsFor
            goalsAgainst
            goalDifference
            matches {
              status
              utcDate
              score {
                fullTime {
                  home
                  away
                }
              }
              homeTeam {
                id
                name
              }
              awayTeam {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;
