import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';
import { Area, Competition, Position } from '../football.types';

export const resolvers = {
  Query: {
    football() {
      return {};
    },
  },
  Football: {
    async areas(): Promise<Area[]> {
      return farfetch(`${BASE_API}/football/areas`);
    },
    async area(_: unknown, { id }: { id: string }): Promise<Area> {
      return farfetch(`${BASE_API}/football/areas/${id}`);
    },
  },
  FootballArea: {
    async competitions({ id: areaId }: { id: string }): Promise<Competition[]> {
      const competitions: Competition[] = await farfetch<Competition[]>(
        `${BASE_API}/football/areas/${areaId}/competitions`
      );
      return competitions;
    },
  },
  FootballCompetition: {
    async standings({ areaId, id: competitionId }: { areaId: string; id: string }): Promise<Position[]> {
      return farfetch(`${BASE_API}/football/areas/${areaId}/competitions/${competitionId}/standings`);
    },
  },
  FootballTeam: {
    async matches({
      areaId,
      competitionId,
      id: teamId,
    }: {
      areaId: string;
      competitionId: string;
      id: string;
    }): Promise<Position[]> {
      const url = `${BASE_API}/football/areas/${areaId}/competitions/${competitionId}/standings/${teamId}/matches`;
      return farfetch(url);
    },
  },
};
