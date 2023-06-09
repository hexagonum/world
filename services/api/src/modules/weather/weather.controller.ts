import { Route, Tags, Controller, Get, Query } from 'tsoa';
import { WeatherService } from './weather.service';

@Route('/Weather')
@Tags('Weather')
export class WeatherController extends Controller {
  private weatherService: WeatherService;

  constructor() {
    super();
    this.weatherService = new WeatherService();
  }

  @Get()
  async getVideoCategories(@Query('latitude') latitude = 0, @Query('longitude') longitude = 0) {
    return this.weatherService.getWeather({ latitude, longitude });
  }
}
