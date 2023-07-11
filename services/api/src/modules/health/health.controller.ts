import { Controller, Get, Route, SuccessResponse, Tags } from 'tsoa';
import { healthService } from './health.service';
import { HealthResponse } from './health.types';

@Route('/health')
@Tags('Health')
export class HealthController extends Controller {
  @Get()
  @SuccessResponse(200)
  getHealth(): HealthResponse {
    return healthService.getHealth();
  }
}
