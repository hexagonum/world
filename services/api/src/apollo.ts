import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import graphqlDepthLimit from 'graphql-depth-limit';
import http from 'http';
import { NODE_ENV } from './common/environments';

import { resolvers, typeDefs } from './modules/graphql.module';

export const createApolloServer = (httpServer: http.Server): ApolloServer => {
  const landingPage =
    NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageLocalDefault();
  const apolloServer: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    validationRules: [graphqlDepthLimit(10)],
    introspection: NODE_ENV !== 'production',
    plugins: [landingPage, ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  return apolloServer;
};
