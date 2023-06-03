export const typeDefs = `#graphql
  extend type Query {
    currencies: [Currency]
  }

  type Currency {
    code: String
    name: String
    symbol: String
  }
`;
