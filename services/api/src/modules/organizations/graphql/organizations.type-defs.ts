export const typeDefs = `#graphql
  extend type Query {
    organizations: [Organization],
    organization(code: String!): Organization
  }

  type Organization {
    code: String
    name: String
    countries: [Country]
  }
`;
