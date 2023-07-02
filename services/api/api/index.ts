import http from 'http';
import { app } from '../src/app';

const httpServer: http.Server = http.createServer(app);

export default httpServer;
