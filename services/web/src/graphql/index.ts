import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NEXT_PUBLIC_BASE_GRAPHQL } from '@world/configs';

export const apolloClient = new ApolloClient({
  uri: NEXT_PUBLIC_BASE_GRAPHQL,
  cache: new InMemoryCache(),
});
