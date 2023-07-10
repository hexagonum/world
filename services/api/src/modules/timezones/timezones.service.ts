import { PrismaClient, Timezone } from '@prisma/client';
import { getPrismaClient } from '../../common/libs/prisma';

export class TimezonesService {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = getPrismaClient();
  }

  async getTimezones(): Promise<Timezone[]> {
    const timezones: Timezone[] = await this.prismaClient.timezone.findMany({
      orderBy: { code: 'asc' },
    });
    return timezones;
  }

  async getTimezone(code: string): Promise<Timezone> {
    const timezone: Timezone =
      await this.prismaClient.timezone.findFirstOrThrow({
        where: { code },
      });
    return timezone;
  }
}
