import Redis from 'ioredis';
import { REDIS_URI } from '../../environments';
import { jsonParse } from '../../utils/json-parse';
import { logger } from '../logger';

export const redis = new Redis(REDIS_URI);

export const getJSON = async <T>(key: string): Promise<T | null> => {
  try {
    const data: string | null = await redis.get(key);
    return jsonParse<T>(data);
  } catch (error) {
    logger.error(`getJSON error ${error}`);
    return null;
  }
};

export const setJSON = async <T>(
  key: string,
  value: T,
  { expiresIn = 60 * 30 }: { expiresIn?: number } = { expiresIn: 60 * 30 }
): Promise<'OK'> => {
  const jsonString = JSON.stringify(value);
  return redis.set(key, jsonString, 'EX', expiresIn);
};
