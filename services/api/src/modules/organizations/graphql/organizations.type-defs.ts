export const typeDefs = `#graphql
  extend type Query {
    organizations: [Organization]
  }

  type Organization {
    code: String
    name: String
  }
`;
