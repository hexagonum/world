import { mergeResolvers } from '@graphql-tools/merge';
import { citiesResolvers, citiesTypeDefs } from './cities/graphql/cities.module';
import { countriesResolvers, countriesTypeDefs } from './countries/graphql/countries.module';
import { currenciesResolvers, currenciesTypeDefs } from './currencies/graphql/currencies.module';
import { footballResolvers, footballTypeDefs } from './football/graphql/football.module';
import { languagesResolvers, languagesTypeDefs } from './languages/graphql/languages.module';
import { newsResolvers, newsTypeDefs } from './news/graphql/news.module';
import { organizationsResolvers, organizationsTypeDefs } from './organizations/graphql/organizations.module';
import { passportsResolvers, passportsTypeDefs } from './passports/graphql/passports.module';
import { timezonesResolvers, timezonesTypeDefs } from './timezones/graphql/timezones.module';

const rootTypeDefs = `#graphql
  type Query {
    status: String
  }
`;

const rootResolvers = { Query: { status: (): string => 'OK' } };

export const typeDefs = [
  rootTypeDefs,
  citiesTypeDefs,
  countriesTypeDefs,
  currenciesTypeDefs,
  footballTypeDefs,
  languagesTypeDefs,
  newsTypeDefs,
  passportsTypeDefs,
  organizationsTypeDefs,
  timezonesTypeDefs,
];

export const resolvers = mergeResolvers([
  rootResolvers,
  citiesResolvers,
  countriesResolvers,
  currenciesResolvers,
  footballResolvers,
  languagesResolvers,
  newsResolvers,
  passportsResolvers,
  organizationsResolvers,
  timezonesResolvers,
]);
