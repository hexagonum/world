export const typeDefs = `#graphql
  extend type Query {
    timezones: [Timezone]
  }

  type Timezone {
    code: String
    name: String
    offset: String
    utcOffset: String
  }
`;
