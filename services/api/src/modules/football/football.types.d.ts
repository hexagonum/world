import { Area } from '../../common/client/football-data/types';

export type Competition = {
  area: Area;
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  plan: string;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
};

export type Standing = {
  stage: 'REGULAR_SEASON';
  type: 'TOTAL' | 'HOME' | 'AWAY';
  table: Position[];
};

export type Position = {
  team: Team;
  position: number;
  playedGames: number;
  form: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

export type Team = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
};

export type Match = {
  competition: Competition;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    winner: 'AWAY_TEAM' | 'HOME_TEAM';
    duration: 'REGULAR';
    fullTime: {
      home: number;
      away: number;
    };
    halfTime: {
      home: number;
      away: number;
    };
  };
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  group: string;
  lastUpdated: string;
};
