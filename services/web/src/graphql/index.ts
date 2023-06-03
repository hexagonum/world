import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BASE_GRAPHQL } from '@world/configs';

export const apolloClient = new ApolloClient({
  uri: BASE_GRAPHQL,
  cache: new InMemoryCache(),
});
