export type ForexRate = { code: string; rate: number };

export type ForexHistory = { date: string; from: number; to: number };

export type ForexSource = 'fixer' | 'frankfurter';
