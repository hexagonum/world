import { OpenMeteoClient } from '../../common/client/weather-bit';
import { logger } from '../../common/libs/logger';
import { getJSON, setJSON } from '../../common/database/redis';

export class WeatherService {
  private openMeteoClient: OpenMeteoClient;

  constructor() {
    this.openMeteoClient = new OpenMeteoClient();
  }

  async getWeather({
    latitude = 0,
    longitude = 0,
  }: {
    latitude: number;
    longitude: number;
  }) {
    const redisKey = `weather-${latitude}-${longitude}`;
    const cacheWeather = await getJSON(redisKey);
    if (cacheWeather) return cacheWeather;
    const weather = await this.openMeteoClient.getCurrentWeather({
      latitude,
      longitude,
    });
    setJSON(redisKey, weather).catch(logger.error);
    return weather;
  }
}
