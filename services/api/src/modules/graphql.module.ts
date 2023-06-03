import { mergeResolvers } from '@graphql-tools/merge';
import { countriesResolvers, countriesTypeDefs } from './countries/graphql/countries.module';

const rootTypeDefs = `#graphql
  type Query {
    status: String
  }
`;

const rootResolvers = { Query: { status: (): string => 'OK' } };

export const typeDefs = [rootTypeDefs, countriesTypeDefs];

export const resolvers = mergeResolvers([rootResolvers, countriesResolvers]);
