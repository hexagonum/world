import { GoogleTrend, Prisma } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class GoogleService {
  public async getGoogleTrends(countryCode: string): Promise<GoogleTrend[]> {
    let where: Prisma.GoogleTrendWhereInput = {};
    if (countryCode) where = { ...where, countryCode };
    const googleTrends = await prismaClient.googleTrend.findMany({ where });
    return googleTrends;
  }

  public async getGoogleRanks(limit: number): Promise<{ rank: number; query: string; count: number }[]> {
    const googleTrends = await prismaClient.googleTrend.findMany();
    const queries: string[] = googleTrends.map(({ queries = [] }) => queries).flat(1);
    const queryByCount: Record<string, number> = {};
    for (const query of queries) {
      if (queryByCount[query]) queryByCount[query] += 1;
      else queryByCount[query] = 1;
    }
    const sortedQueryByCount = Object.entries(queryByCount)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    return Object.entries(sortedQueryByCount)
      .map(([key, value], index: number) => ({
        rank: index + 1,
        query: key,
        count: value as number,
      }))
      .filter(({ rank }) => rank <= limit);
  }
}
