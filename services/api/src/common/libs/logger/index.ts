import pino, { Logger } from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({ colorize: true });
export const logger: Logger = pino(stream);
