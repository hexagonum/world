export const typeDefs = `#graphql
  extend type Query {
    currencies: [Currency]
    currency(code: String!): Currency
    rates(amount: Float, base: String): [ForexRate]
  }

  type Currency {
    code: String
    name: String
    symbol: String
    countries: [Country]
  }

  type ForexRate {
    code: String
    rate: Float
  }
`;
