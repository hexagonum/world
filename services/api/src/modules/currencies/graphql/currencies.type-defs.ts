export const typeDefs = `#graphql
  extend type Query {
    currencies: [Currency]
    currency(code: String!): Currency
  }

  type Currency {
    code: String
    name: String
    symbol: String
    countries: [Country]
  }
`;