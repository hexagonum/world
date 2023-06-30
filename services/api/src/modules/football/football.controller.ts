import { Controller, Get, Path, Route, Tags } from 'tsoa';
import { FootballService } from './football.service';

@Route('/football')
@Tags('Football')
export class FootballController extends Controller {
  private footballService: FootballService;

  constructor() {
    super();
    this.footballService = new FootballService();
  }

  @Get('areas')
  async getAreas() {
    return this.footballService.getAreas();
  }

  @Get('areas/:areaId')
  getArea(@Path('areaId') areaId: string) {
    return this.footballService.getArea(areaId);
  }

  @Get('areas/:areaId/competitions')
  getCompetitions(@Path('areaId') areaId: string) {
    return this.footballService.getCompetitions(areaId);
  }

  @Get('areas/:areaId/competitions/:competitionId')
  getCompetition(
    @Path('areaId') areaId: string,
    @Path('competitionId') competitionId: string
  ) {
    return this.footballService.getCompetition(areaId, competitionId);
  }

  @Get('areas/:areaId/competitions/:competitionId/standings')
  getStandings(
    @Path('areaId') areaId: string,
    @Path('competitionId') competitionId: string
  ) {
    return this.footballService.getStandings(areaId, competitionId);
  }

  @Get('areas/:areaId/competitions/:competitionId/standings/:teamId')
  getTeam(
    @Path('areaId') areaId: string,
    @Path('competitionId') competitionId: string,
    @Path('teamId') teamId: string
  ) {
    return this.footballService.getTeam(areaId, competitionId, teamId);
  }

  @Get('areas/:areaId/competitions/:competitionId/standings/:teamId/matches')
  getMatches(
    @Path('areaId') areaId: string,
    @Path('competitionId') competitionId: string,
    @Path('teamId') teamId: string
  ) {
    return this.footballService.getMatches(areaId, competitionId, teamId);
  }
}
