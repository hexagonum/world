import { writeFileSync } from 'fs';

const getCountries = async (): Promise<any[]> => {
  try {
    const url = 'https://restcountries.com/v3.1/all';
    const response: Response = await fetch(url);
    const countries = await response.json();
    return countries.map((country: any) => {
      const area: number = country.area || 0;
      const population: number = country.population || 0;
      const borders: string[] = country.borders || [];
      const density: number = area === 0 ? 0 : population / area;
      return { ...country, density, borders };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

const main = async () => {
  const basePath = './src/data';
  const countries = await getCountries();
  if (countries.length > 0) writeFileSync(`${basePath}/countries.json`, JSON.stringify(countries, null, 2));
  const unitedNationMembers = countries.filter(({ unMember = false }) => unMember);
  if (unitedNationMembers.length > 0)
    writeFileSync(`${basePath}/united-nation-members.json`, JSON.stringify(unitedNationMembers, null, 2));
  let languagesMap: Record<string, string> = {};
  let currenciesMap = {};
  let isoAlpha2Codes: Record<string, string> = {};
  let isoAlpha3Codes: Record<string, string> = {};
  let timezones: string[] = [];
  for (const country of countries) {
    const {
      name: { common = '' },
      cca2 = '',
      cca3 = '',
      currencies = {},
      languages = {},
      timezones: countryTimezones = [],
    } = country;
    languagesMap = { ...languagesMap, ...languages };
    currenciesMap = { ...currenciesMap, ...currencies };
    isoAlpha2Codes[cca2] = common;
    isoAlpha3Codes[cca3] = common;
    timezones = [...new Set([...countryTimezones, ...timezones])].sort();
  }
  if (Object.keys(languagesMap).length > 0)
    writeFileSync(`${basePath}/languages.json`, JSON.stringify(languagesMap, null, 2));
  if (Object.keys(currenciesMap).length > 0)
    writeFileSync(`${basePath}/currencies.json`, JSON.stringify(currenciesMap, null, 2));
  if (timezones.length > 0) writeFileSync(`${basePath}/timezones.json`, JSON.stringify(timezones, null, 2));
  if (Object.keys(isoAlpha2Codes).length > 0)
    writeFileSync(`${basePath}/iso-alpha-2-codes.json`, JSON.stringify(isoAlpha2Codes, null, 2));
  if (Object.keys(isoAlpha3Codes).length > 0)
    writeFileSync(`${basePath}/iso-alpha-3-codes.json`, JSON.stringify(isoAlpha3Codes, null, 2));
};

main().catch(console.error);
