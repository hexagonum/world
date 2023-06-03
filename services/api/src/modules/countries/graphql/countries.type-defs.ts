export const typeDefs = `#graphql
  extend type Query {
    countries:[Country]
  }

  type Country {
    commonName: String
    cca2: String
    cca3: String
    region: String
    subregion: String
  }
`;
