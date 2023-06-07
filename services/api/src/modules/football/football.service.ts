import { URLSearchParams } from 'url';
import { API_KEY_FOOTBALL_DATA } from '../../common/environments';
import { farfetch } from '../../common/libs/farfetch';
import { Area, Competition, Match, Standing, Team } from './football.types';

const BASE_URL = 'http://api.football-data.org/v4';
const headers = { 'X-Auth-Token': API_KEY_FOOTBALL_DATA };

export class FootballService {
  public async getAreas(): Promise<Area[]> {
    const url = `${BASE_URL}/areas`;
    const response = await farfetch<{ areas: Area[] }>(url, { headers });
    return response.areas || [];
  }

  public async getArea(areaId: string): Promise<Area> {
    const url = `${BASE_URL}/areas/${areaId}`;
    return farfetch<Area>(url, { headers });
  }

  public async getCompetitions(areaId: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('areas', areaId);
    const url = `${BASE_URL}/competitions?${urlSearchParams.toString()}`;
    const response = await farfetch<{ competitions: Competition[] }>(url, { headers });
    return (response.competitions || []).map((competition) => {
      return { ...competition, areaId };
    });
  }

  public async getCompetition(areaId: string, competitionId: string) {
    const url = `${BASE_URL}/competitions/${competitionId}`;
    const competition = await farfetch<Competition>(url, { headers });
    return { ...competition, areaId };
  }

  public async getStandings(areaId: string, competitionId: string) {
    const url = `${BASE_URL}/competitions/${competitionId}/standings`;
    const response = await farfetch<{ standings: Standing[] }>(url, { headers });
    const standings = response.standings ?? [];
    const totalStanding = standings.find(({ type }) => type === 'TOTAL');
    return (totalStanding?.table ?? []).map(
      ({
        team: { id = 0, name = '', shortName = '', tla = '', crest = '' },
        position = 0,
        playedGames = 0,
        form = '',
        won = 0,
        draw = 0,
        lost = 0,
        points = 0,
        goalsFor = 0,
        goalsAgainst = 0,
        goalDifference = 0,
      }) => {
        return {
          areaId,
          competitionId,
          id,
          name,
          shortName,
          tla,
          crest,
          position,
          playedGames,
          form,
          won,
          draw,
          lost,
          points,
          goalsFor,
          goalsAgainst,
          goalDifference,
        };
      }
    );
  }

  public async getTeam(areaId: string, competitionId: string, teamId: string) {
    const url = `${BASE_URL}/teams/${teamId}`;
    const team: Team = await farfetch<Team>(url, { headers });
    return { ...team, areaId, competitionId };
  }

  public async getMatches(areaId: string, competitionId: string, teamId: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('competitions', competitionId);
    const url = `${BASE_URL}/teams/${teamId}/matches?${urlSearchParams.toString()}`;
    const response = await farfetch<{ matches: Match[] }>(url, { headers });
    return response.matches;
  }
}
