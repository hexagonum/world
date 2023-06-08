export type Football = {
  areas: FootballArea[];
};

export type FootballArea = {
  id: number;
  name: string;
  competitions: FootballCompetition[];
};

export type FootballCompetition = {
  id: number;
  name: string;
  standings: FootballStanding[];
};

export type FootballStanding = {
  position: number;
  id: number;
  name: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  matches: FootballMatch[];
};

export type FootballMatch = {
  status: string;
  utcDate: string;
  score: { fullTime: { home: number; away: number } };
  homeTeam: { id: string; name: string };
  awayTeam: { id: string; name: string };
};
