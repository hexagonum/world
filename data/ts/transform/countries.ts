import { writeFileSync } from 'fs';
import countries from '../../json/raw/countries.json';
import trends from '../../json/raw/google-trends.json';
import organizations from '../../json/raw/organizations.json';

const main = async () => {
  const transformedCountries = countries.map(
    ({
      name: { common = '', official = '' } = { common: '', official: '' },
      cca2 = '',
      cca3 = '',
      ccn3 = '',
      cioc = '',
      fifa = '',
      status = '',
      independent = false,
      unMember = false,
      latlng = [],
      tld = [],
      capital = [],
      altSpellings = [],
      continents = [],
      borders = [],
      timezones = [],
      region = '',
      subregion = '',
      flag = '',
      flags: { svg = '', png = '' } = { svg: '', png: '' },
      area = 0,
      population = 0,
      maps: { googleMaps = '' } = { googleMaps: '' },
      languages = {},
      currencies = {},
      startOfWeek = '',
    }) => {
      const [latitude = 0, longitude = 0] = latlng;
      const density: number = area !== 0 ? Math.round(population / area) : 0;
      const languageCodes: string[] = Object.keys(languages);
      const currencyCodes: string[] = Object.keys(currencies);
      const organizationCodes: string[] = organizations
        .filter(({ members = [] }) =>
          members.map(({ code }) => code).includes(cca3)
        )
        .map(({ code }) => code);
      return {
        code: cca3,
        commonName: common,
        officialName: official,
        cca2,
        cca3,
        ccn3,
        cioc,
        fifa,
        status,
        independent,
        unMember,
        latitude,
        longitude,
        topLevelDomains: tld,
        capital,
        alternativeSpellings: altSpellings,
        continents,
        borders,
        region,
        subregion,
        startOfWeek,
        flag,
        flagPNG: png,
        flagSVG: svg,
        area,
        population,
        density,
        googleMaps,
        timezones,
        languageCodes,
        currencyCodes,
        organizationCodes,
      };
    }
  );
  writeFileSync(
    './json/transformed/countries.json',
    JSON.stringify(transformedCountries, null, 2)
  );
};

main().catch(console.error);
