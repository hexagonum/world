export const typeDefs = `#graphql
  extend type Query {
    passports(limit: Int): [Passport]
  }

  type Passport {
    countryCode: String
    globalRank: Int
    individualRank: Int
    mobilityScore: Int
    country: Country
  }
`;
