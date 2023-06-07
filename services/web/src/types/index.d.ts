export type City = {
  id: string;
  country: Country;
  state: string;
  stateCode: string;
  stateLevel: string;
  city: string;
  cityCode: string;
  cityLevel: string;
  latitude: number;
  longitude: number;
  timezone: number;
};

export type Country = {
  code: string;
  commonName: string;
  officialName: string;
  cca2: string;
  flagSVG: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  fifa: string;
  flag: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  density: number;
  latitude: number;
  longitude: number;
  googleMaps: string;
  capital: string[];
  borders: string[];
  timezones: string[];
  googleTrends: string[];
  topLevelDomains: string[];
  currencies: Currency[];
  languages: Language[];
  organizations: Organization[];
  cities: City[];
};

type Currency = { code: string; name: string; symbol: string };

type Language = { code: string; name: string };

type Organization = { code: string; name: string };

type Football = {
  areas: FootballArea[];
};

type FootballArea = {
  id: number;
  name: string;
  competitions: FootballCompetition[];
};

type FootballCompetition = {
  id: number;
  name: string;
  standings: FootballStanding[];
};

type FootballStanding = {
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

type FootballMatch = {
  status: string;
  utcDate: string;
  score: { fullTime: { home: number; away: number } };
  homeTeam: { id: string; name: string };
  awayTeam: { id: string; name: string };
};
