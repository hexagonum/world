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

type Passport = {
  countryCode: string;
  globalRank: number;
  individualRank: number;
  mobilityScore: number;
  country: Country;
};
