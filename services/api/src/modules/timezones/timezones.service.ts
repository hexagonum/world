import { Timezone } from '@prisma/client';
import { prismaClient } from '../../common/libs/prisma';

export class TimezonesService {
  async getTimezones(): Promise<Timezone[]> {
    const timezones: Timezone[] = await prismaClient.timezone.findMany();
    return timezones;
  }

  async getTimezone(code: string): Promise<Timezone> {
    const timezone: Timezone = await prismaClient.timezone.findFirstOrThrow({ where: { code } });
    return timezone;
  }
}
