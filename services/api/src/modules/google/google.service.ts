import { GoogleTrend, Prisma, PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../../common/database/prisma';

export class GoogleService {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = getPrismaClient();
  }

  public async getGoogleTrends({
    countryCode,
  }: {
    countryCode: string;
  }): Promise<GoogleTrend[]> {
    let where: Prisma.GoogleTrendWhereInput = {};
    if (countryCode) where = { ...where, countryCode };
    const googleTrends: GoogleTrend[] =
      await this.prismaClient.googleTrend.findMany({ where });
    return googleTrends;
  }

  public async getGoogleRanks({
    offset = 0,
    limit = 10,
  }: {
    offset: number;
    limit: number;
  }): Promise<{ rank: number; query: string; count: number }[]> {
    const googleTrends = await this.prismaClient.googleTrend.findMany();
    const queries: string[] = googleTrends
      .map(({ queries = [] }) => queries)
      .flat(1);
    const queryByCount: Record<string, number> = {};
    for (const query of queries) {
      if (queryByCount[query]) queryByCount[query] += 1;
      else queryByCount[query] = 1;
    }
    const sortedQueryByCount: Record<string, number> = Object.entries(
      queryByCount
    ).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    return Object.entries(sortedQueryByCount)
      .map(([key, value]) => ({ query: key, count: value }))
      .sort(({ count: a }, { count: b }) => b - a)
      .map((rank, index: number) => ({ ...rank, rank: index + 1 }))
      .slice(offset, offset + limit);
  }
}
