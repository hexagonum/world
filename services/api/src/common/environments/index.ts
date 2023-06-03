import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const environments = dotenv.config();
dotenvExpand.expand(environments);

export const NODE_ENV: string = process.env.NODE_ENV ?? 'development';

export const PORT: string = process.env.PORT ?? '8000';

export const JWT_SECRET: string = process.env.JWT_SECRET ?? '';

export const SALT_OR_ROUNDS: string = process.env.SALT_OR_ROUNDS ?? '10';

export const BASE_API: string = process.env.BASE_API ?? '10';

export const API_KEY_NEWS: string = process.env.API_KEY_NEWS ?? 'https://hexagonum-world.onrender.com';
