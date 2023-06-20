import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import helmet, { HelmetOptions } from 'helmet';
import morgan from 'morgan';
import { NODE_ENV } from './common/environments';
import errorHandler from './common/middlewares/error';
import notFoundHandler from './common/middlewares/not-found';
import { RegisterRoutes } from './routes';

export const app = express();
const helmetOptions: Readonly<HelmetOptions> = { contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false };

app.use(cors());
app.use(json());
app.use(compression());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(helmet(helmetOptions));
app.use(express.static('public'));
app.use(urlencoded({ extended: true }));

RegisterRoutes(app);

app.use(notFoundHandler({ whitelist: ['/graphql'] }));
app.use(errorHandler);
