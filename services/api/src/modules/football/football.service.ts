import { URLSearchParams } from 'url';
import { API_KEY_FOOTBALL_DATA } from '../../common/environments';
import { farfetch } from '../../common/libs/farfetch';
import { Area, Competition, Match, Standing, Team } from './football.types';
import { getJSON, setJSON } from '../../common/libs/redis';
import logger from '../../common/libs/logger';

const BASE_URL = 'http://api.football-data.org/v4';
const headers = { 'X-Auth-Token': API_KEY_FOOTBALL_DATA };

export class FootballService {
  public async getAreas(): Promise<Area[]> {
    // Cache
    const redisKey = `football-areas`;
    const cacheAreas: Area[] | null = await getJSON<Area[]>(redisKey);
    if (cacheAreas) return cacheAreas;
    // API
    const url = `${BASE_URL}/areas`;
    const response = await farfetch<{ areas: Area[] }>(url, { headers });
    const areas: Area[] = response.areas ?? [];
    setJSON(redisKey, areas).catch(logger.error);
    return areas;
  }

  public async getArea(areaId: string): Promise<Area> {
    // Cache
    const redisKey = `football-areas-${areaId}`;
    const cacheArea: Area | null = await getJSON<Area>(redisKey);
    if (cacheArea) return cacheArea;
    // API
    const url = `${BASE_URL}/areas/${areaId}`;
    const area: Area = await farfetch<Area>(url, { headers });
    setJSON(redisKey, area).catch(logger.error);
    return area;
  }

  public async getCompetitions(areaId: string) {
    // Cache
    const redisKey = `football-areas-${areaId}-competitions`;
    const cacheCompetitions: Competition[] | null = await getJSON<
      Competition[]
    >(redisKey);
    if (cacheCompetitions) return cacheCompetitions;
    // API
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('areas', areaId);
    const url = `${BASE_URL}/competitions?${urlSearchParams.toString()}`;
    const response = await farfetch<{ competitions: Competition[] }>(url, {
      headers,
    });
    const competitions = (response.competitions || []).map((competition) => ({
      ...competition,
      areaId,
    }));
    setJSON(redisKey, competitions).catch(logger.error);
    return competitions;
  }

  public async getCompetition(areaId: string, competitionId: string) {
    // Cache
    const redisKey = `football-areas-${areaId}-competitions-${competitionId}`;
    const cacheCompetition: Competition | null = await getJSON<Competition>(
      redisKey
    );
    if (cacheCompetition) return cacheCompetition;
    // API
    const url = `${BASE_URL}/competitions/${competitionId}`;
    const competition = await farfetch<Competition>(url, { headers });
    const enhancedCompetition = { ...competition, areaId };
    setJSON(redisKey, enhancedCompetition).catch(logger.error);
    return enhancedCompetition;
  }

  public async getStandings(areaId: string, competitionId: string) {
    // Cache
    const redisKey = `football-areas-${areaId}-competitions-${competitionId}-teams`;
    const cacheStandings: Standing[] | null = await getJSON<Standing[]>(
      redisKey
    );
    if (cacheStandings) return cacheStandings;
    // API
    const url = `${BASE_URL}/competitions/${competitionId}/standings`;
    const response = await farfetch<{ standings: Standing[] }>(url, {
      headers,
    });
    const totalStanding = (response.standings ?? []).find(
      ({ type }) => type === 'TOTAL'
    );
    const standings = (totalStanding?.table ?? []).map(
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
      }) => ({
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
      })
    );
    setJSON(redisKey, standings).catch(logger.error);
    return standings;
  }

  public async getTeam(areaId: string, competitionId: string, teamId: string) {
    // Cache
    const redisKey = `football-areas-${areaId}-competitions-${competitionId}-teams-${teamId}`;
    const cacheTeam: Team | null = await getJSON<Team>(redisKey);
    if (cacheTeam) return cacheTeam;
    // API
    const url = `${BASE_URL}/teams/${teamId}`;
    const team: Team = await farfetch<Team>(url, { headers });
    const enhancedTeam = { ...team, areaId, competitionId };
    setJSON(redisKey, enhancedTeam).catch(logger.error);
    return enhancedTeam;
  }

  public async getMatches(
    areaId: string,
    competitionId: string,
    teamId: string
  ) {
    // Cache
    const redisKey = `football-areas-${areaId}-competitions-${competitionId}-teams-${teamId}-matches`;
    const cacheMatches: Match[] | null = await getJSON<Match[]>(redisKey);
    if (cacheMatches) return cacheMatches;
    // API
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('competitions', competitionId);
    const url = `${BASE_URL}/teams/${teamId}/matches?${urlSearchParams.toString()}`;
    const response = await farfetch<{ matches: Match[] }>(url, { headers });
    const { matches = [] } = response;
    setJSON(redisKey, matches).catch(logger.error);
    return matches;
  }
}
