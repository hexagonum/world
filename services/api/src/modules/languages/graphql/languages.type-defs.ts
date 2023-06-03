export const typeDefs = `#graphql
  extend type Query {
    languages: [Language]
  }

  type Language {
    code: String
    name: String
  }
`;
