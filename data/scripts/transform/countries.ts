import { writeFileSync } from 'fs';
import countries from '../../json/raw/countries.json';
import trends from '../../json/raw/google-trends.json';
import passports from '../../json/raw/passports/passports.json';
import requirements from '../../json/raw/passports/requirements.json';

const main = async () => {
  const processedCountries = countries.map(
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
    }) => {
      const density: number = area !== 0 ? Math.round(population / area) : 0;
      const languageCodes = Object.keys(languages);
      const currencyCodes = Object.keys(currencies);
      const { trends: googleTrends = [] } = trends.find(
        ({ country }) => country.toLowerCase() === common.toLowerCase()
      ) ?? { trends: [] };
      const {
        globalRank = 0,
        mobilityScore = 0,
        individualRank = 0,
      } = passports.find(({ cca2: passportCode }) => cca2.toLowerCase() === passportCode.toLowerCase()) ?? {
        globalRank: 0,
        mobilityScore: 0,
        individualRank: 0,
      };
      const passportRequirements = (requirements as any)[cca2];
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
        latlng,
        topLevelDomains: tld,
        capital,
        alternativeSpellings: altSpellings,
        continents,
        borders,
        region,
        subregion,
        flag,
        flagPNG: png,
        flagSVG: svg,
        area,
        population,
        density,
        googleMaps,
        googleTrends,
        timezones,
        languageCodes,
        currencyCodes,
        passportGlobalRank: globalRank,
        passportIndividualRank: individualRank,
        passportMobilityScore: mobilityScore,
        passportRequirements,
      };
    }
  );
  writeFileSync('./json/processed/countries.json', JSON.stringify(processedCountries, null, 2));
};

main().catch(console.error);
