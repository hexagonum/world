import { farfetch } from '../../common/libs/farfetch';
import { logger } from '../../common/libs/logger';
import { getJSON, setJSON } from '../../common/libs/redis';

export class WeatherService {
  async getWeather({
    latitude = 0,
    longitude = 0,
  }: {
    latitude: number;
    longitude: number;
  }) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('current_weather', 'true');
    urlSearchParams.set('latitude', latitude.toString());
    urlSearchParams.set('longitude', longitude.toString());
    const redisKey = `weather-${latitude}-${longitude}`;
    const cacheWeather = await getJSON(redisKey);
    if (cacheWeather) return cacheWeather;
    const url = `https://api.open-meteo.com/v1/forecast?${urlSearchParams.toString()}`;
    const weather = await farfetch(url);
    setJSON(redisKey, weather).catch(logger.error);
    return weather;
  }
}
