export const typeDefs = `#graphql
  extend type Query {
    currencies: [Currency]
    currency(code: String!): Currency
    rates(amount: Float, base: String, to: String): [ForexRate]
    history(amount: Float, days: String, from: String!, to: String!): [ForexHistory]
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

  type ForexHistory {
    date: String
    from: Float
    to: Float
  }
`;
