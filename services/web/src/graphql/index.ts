import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NEXT_PUBLIC_BASE_GRAPHQL } from '@world/configs';

console.log('GraphQL URI', NEXT_PUBLIC_BASE_GRAPHQL);

export const apolloClient = new ApolloClient({
  uri: NEXT_PUBLIC_BASE_GRAPHQL,
  cache: new InMemoryCache(),
});
