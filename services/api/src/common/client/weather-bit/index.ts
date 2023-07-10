import { farfetch } from '../../libs/farfetch';

export class OpenMeteoClient {
  private base = 'https://api.open-meteo.com/v1';

  public async getCurrentWeather(
    {
      latitude = 0,
      longitude = 0,
    }: {
      latitude: number;
      longitude: number;
    } = { latitude: 0, longitude: 0 }
  ) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('current_weather', 'true');
    urlSearchParams.set('latitude', latitude.toString());
    urlSearchParams.set('longitude', longitude.toString());
    const url = `${this.base}/forecast?${urlSearchParams.toString()}`;
    return farfetch(url);
  }
}
