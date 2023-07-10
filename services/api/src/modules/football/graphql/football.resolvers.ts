import { BASE_API } from '../../../common/environments';
import { farfetch } from '../../../common/libs/farfetch';
import { logger } from '../../../common/libs/logger';
import { Competition, Position, Team } from '../football.types';

type FilterOptions = {
  areaId?: number;
  competitionId?: number;
  teamId?: number;
};

export const resolvers = {
  Query: {
    football(
      _: unknown,
      { filterOptions = {} }: { filterOptions: FilterOptions }
    ) {
      return { filterOptions };
    },
  },
  Football: {
    async areas({ filterOptions }: { filterOptions: FilterOptions }) {
      const url = `${BASE_API}/football/areas`;
      logger.info(`areas url=${url}`);
      const areas: { id: number }[] = await farfetch(url);
      return areas
        .filter(({ id }: { id: number }) =>
          filterOptions.areaId ? filterOptions.areaId === id : true
        )
        .map((area) => ({ ...area, filterOptions }));
    },
  },
  FootballArea: {
    async competitions({
      id: areaId,
      filterOptions,
    }: {
      id: string;
      filterOptions: FilterOptions;
    }) {
      const url = `${BASE_API}/football/areas/${areaId}/competitions`;
      const competitions = await farfetch<Competition[]>(url);
      return competitions
        .filter(({ id }: { id: number }) =>
          filterOptions.competitionId
            ? filterOptions.competitionId === id
            : true
        )
        .map((competition) => ({ ...competition, filterOptions }));
    },
  },
  FootballCompetition: {
    async standings({
      areaId,
      id: competitionId,
      filterOptions,
    }: {
      areaId: string;
      id: string;
      filterOptions: FilterOptions;
    }) {
      const url = `${BASE_API}/football/areas/${areaId}/competitions/${competitionId}/standings`;
      const teams = await farfetch<Team[]>(url);
      return teams
        .filter(({ id }: { id: number }) =>
          filterOptions.teamId ? filterOptions.teamId === id : true
        )
        .map((team) => ({ ...team, filterOptions }));
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
