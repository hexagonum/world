import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/dist/esm/express4';
import http from 'http';
import { createApolloServer } from '../src/apollo';
import { app } from '../src/app';

const httpServer: http.Server = http.createServer(app);
const apolloServer: ApolloServer = createApolloServer(httpServer);
apolloServer.start();
app.use(expressMiddleware(apolloServer));

export default httpServer;
