import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NEXT_PUBLIC_BASE_GRAPHQL, BASE_GRAPHQL } from '@world/configs';

const GRAPHQL_URI: string = NEXT_PUBLIC_BASE_GRAPHQL || BASE_GRAPHQL || '';

console.log('GraphQL URI', GRAPHQL_URI);

export const apolloClient = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
});
