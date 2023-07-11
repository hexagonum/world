export const typeDefs = `#graphql
  extend type Query {
    passports(limit: Int, query: String): [Passport]
  }

  type Passport {
    countryCode: String
    globalRank: Int
    individualRank: Int
    mobilityScore: Int
    country: Country
  }
`;
