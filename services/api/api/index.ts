import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'express';
import http from 'http';
import { createApolloServer } from '../src/apollo';
import { app } from '../src/app';

const startServer = async (apolloServer: ApolloServer) => {
  await apolloServer.start();
  app.use(
    '/api/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(apolloServer)
  );
};

const httpServer: http.Server = http.createServer(app);
const apolloServer: ApolloServer = createApolloServer(httpServer);
startServer(apolloServer).catch((error) => console.error(error));

export default httpServer;
