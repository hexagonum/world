import { Controller, Get, Query, Route, SuccessResponse, Tags } from 'tsoa';
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
  @SuccessResponse(200)
  async getWeather(
    @Query('latitude') latitude = 0,
    @Query('longitude') longitude = 0
  ) {
    return this.weatherService.getWeather({ latitude, longitude });
  }
}
