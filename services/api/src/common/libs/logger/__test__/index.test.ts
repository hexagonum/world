import { logger } from '..';

describe('logger', () => {
  it('info', () => {
    logger.trace('trace');
    logger.debug('debug');
    logger.info('info');
    logger.warn('warn');
    logger.error('error');
    logger.fatal('fatal');
  });
});
