import { mergeResolvers } from '@graphql-tools/merge';
import { countriesResolvers, countriesTypeDefs } from './countries/graphql/countries.module';
import { currenciesResolvers, currenciesTypeDefs } from './currencies/graphql/currencies.module';
import { languagesResolvers, languagesTypeDefs } from './languages/graphql/languages.module';
import { newsResolvers, newsTypeDefs } from './news/graphql/news.module';
import { organizationsResolvers, organizationsTypeDefs } from './organizations/graphql/organizations.module';
import { timezonesResolvers, timezonesTypeDefs } from './timezones/graphql/timezones.module';

const rootTypeDefs = `#graphql
  type Query {
    status: String
  }
`;

const rootResolvers = { Query: { status: (): string => 'OK' } };

export const typeDefs = [
  rootTypeDefs,
  countriesTypeDefs,
  currenciesTypeDefs,
  languagesTypeDefs,
  newsTypeDefs,
  organizationsTypeDefs,
  timezonesTypeDefs,
];

export const resolvers = mergeResolvers([
  rootResolvers,
  countriesResolvers,
  currenciesResolvers,
  languagesResolvers,
  newsResolvers,
  organizationsResolvers,
  timezonesResolvers,
]);
