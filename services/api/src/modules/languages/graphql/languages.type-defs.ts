export const typeDefs = `#graphql
  extend type Query {
    languages: [Language]
    language(code: String!): Language
  }

  type Language {
    code: String
    name: String
    countries: [Country]
  }
`;
