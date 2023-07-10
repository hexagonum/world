import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  BASE_GRAPHQL,
  NEXT_PUBLIC_BASE_GRAPHQL,
} from '@world/common/environments';
import { log } from '@world/common/log';

const GRAPHQL_URI: string = NEXT_PUBLIC_BASE_GRAPHQL || BASE_GRAPHQL || '';

log.info(`GRAPHQL_URI=${GRAPHQL_URI}`);

export const apolloClient = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
});
