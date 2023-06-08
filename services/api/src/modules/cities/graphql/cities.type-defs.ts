export const typeDefs = `#graphql
  extend type Query {
    cities(countryCode: String): [City]
  }

  type City {
    id: String
    countryCode: String
    region: String
    subregion: String
    state: String
    stateCode: String
    stateLevel: String
    city: String
    cityCode: String
    cityLevel: String
    latitude: Float
    longitude: Float
    timezone: Float
    country: Country
  }
`;
