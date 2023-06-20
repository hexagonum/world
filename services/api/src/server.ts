import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import graphqlDepthLimit from 'graphql-depth-limit';
import http from 'http';
import { HttpError } from 'http-errors';
import { app } from './app';
import { NODE_ENV, PORT } from './common/environments';
import logger from './common/libs/logger';
import { resolvers, typeDefs } from './modules/graphql.module';

const normalizePort = (val: string): string | number | boolean => {
  const portOrPipe = parseInt(val, 10);

  if (isNaN(portOrPipe)) {
    // named pipe
    return val;
  }

  if (portOrPipe >= 0) {
    // port number
    return portOrPipe;
  }

  return false;
};

const main = async () => {
  // Port
  const port = normalizePort(PORT);
  app.set('port', port);
  const httpServer = http.createServer(app);
  // Apollo Server
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
  await apolloServer.start();
  app.use(expressMiddleware(apolloServer));
  // HTTP Server
  httpServer.listen(port);
  httpServer.on('listening', () => {
    const address = httpServer.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address?.port;
    logger.info(`🚀 Server is listening on ${bind}`);
  });
  httpServer.on('error', (error: HttpError) => {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    if (error.code === 'EACCES') logger.error(`${bind} requires elevated privileges`);
    if (error.code === 'EADDRINUSE') logger.error(`${bind} is already in use`);
    process.exit(1);
  });
};

main().catch((error: Error) => logger.error(`main error ${error}`));

process.on('unhandledRejection', (reason: string) => {
  throw new Error(`unhandledRejection ${reason}`);
});

process.on('uncaughtException', (error: Error) => {
  logger.error(`uncaughtException ${error}`);
  process.exit(1);
});
