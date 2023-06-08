export const typeDefs = `#graphql
  extend type Query {
    google(countryCode: String): Google
  }

  type Google {
    ranks: [GoogleRank]
    trends: [GoogleTrend]
  }

  type GoogleRank {
    rank: Int
    query: String
    count: Int
  }

  type GoogleTrend {
    countryCode: String
    queries: [String]
  }
`;
