import Redis from 'ioredis';
import { REDIS_URI } from '../../environments';
import { jsonParse } from '../../utils/json-parse';

export const redis = new Redis(REDIS_URI);

export const getJSON = async <T>(key: string): Promise<T | null> => {
  const data: string | null = await redis.get(key);
  return jsonParse<T>(data);
};

export const setJSON = async <T>(key: string, value: T): Promise<'OK'> => {
  const jsonString = JSON.stringify(value);
  return redis.set(key, jsonString, 'EX', 60 * 30);
};
