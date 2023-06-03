export const typeDefs = `#graphql
  extend type Query {
    passports: [Passport]
  }

  type Passport {
    countryCode: String
    globalRank: Int
    individualRank: Int
    mobilityScore: Int
    country: Country
  }
`;
