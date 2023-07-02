export const typeDefs = `#graphql
  extend type Query {
    countries(codes: String, timezone: String): [Country]
    country(code: String!): Country
  }

  type Country {
    commonName: String
    officialName: String
    # Code
    code: String
    cca2: String
    cca3: String
    ccn3: String
    cioc: String
    fifa: String
    topLevelDomains: [String]
    capital: [String]
    # Population
    population: Int
    area: Float
    density: Int
    # Borders
    borders: [String]
    # Flag
    flag: String
    flagPNG: String
    flagSVG: String
    # Region
    region: String
    subregion: String
    # Timezones
    timezones: [String]
    # Other
    currencies: [Currency]
    languages: [Language]
    organizations: [Organization]
    cities: [City]
    googleTrends: [String]
    latitude: Float
    longitude: Float
    googleMaps: String
  }
`;
