export const typeDefs = `#graphql
  extend type Query {
    countries: [Country]
  }

  type Country {
    commonName: String
    officialName: String
    # Code
    code: String
    cca2: String
    cca3: String
    fifa: String
    topLevelDomains: [String]
    # Population
    population: Int
    area: Float
    density: Int
    # Borders
    borders: [String]
    # Flag
    flag: String
    # Region
    region: String
    subregion: String
    # Timezones
    timezones: [String]
    # Other
    currencies: [Currency]
    languages: [Language]
    organizations: [Organization]
    googleTrends: [String]
  }
`;
