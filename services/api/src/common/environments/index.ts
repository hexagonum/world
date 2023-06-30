import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const environments = dotenv.config();
dotenvExpand.expand(environments);

export const NODE_ENV: string = process.env.NODE_ENV ?? 'development';

export const PORT: string = process.env.PORT ?? '8000';

export const JWT_SECRET: string = process.env.JWT_SECRET ?? 'jwt-secret';

export const SALT_OR_ROUNDS: string = process.env.SALT_OR_ROUNDS ?? '10';

export const BASE_API: string =
  process.env.BASE_API ?? 'https://hexagonum-world.onrender.com';

export const API_KEY_NEWS: string = process.env.API_KEY_NEWS ?? 'api-key-news';
export const API_KEY_FOOTBALL_DATA: string =
  process.env.API_KEY_FOOTBALL_DATA ?? 'api-key-football-data';
export const API_KEY_YOUTUBE_V3: string =
  process.env.API_KEY_YOUTUBE_V3 ?? 'api-key-youtube-v3';

export const REDIS_URI = process.env.REDIS_URI ?? 'redis-uri';
