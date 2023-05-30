import { writeFileSync } from 'fs';
import al from '../../data/json/organizations/al.json';
import apec from '../../data/json/organizations/apec.json';
import asean from '../../data/json/organizations/asean.json';
import au from '../../data/json/organizations/au.json';
import celac from '../../data/json/organizations/celac.json';
import cis from '../../data/json/organizations/cis.json';
import cmw from '../../data/json/organizations/cmw.json';
import coe from '../../data/json/organizations/coe.json';
import cofa from '../../data/json/organizations/cofa.json';
import eu from '../../data/json/organizations/eu.json';
import nato from '../../data/json/organizations/nato.json';
import opec from '../../data/json/organizations/opec.json';
import organizations from '../../data/json/organizations/organizations.json';
import saarc from '../../data/json/organizations/saarc.json';
import timezoneDetails from '../../src/data/timezones/details.json';

const organizationsMap = {
  al,
  apec,
  asean,
  au,
  celac,
  cis,
  cmw,
  coe,
  cofa,
  eu,
  nato,
  opec,
  saarc,
};

const getOrganizations = (countryCode: string) => {
  return organizations.filter(({ code }) => {
    const countryCodes: string[] = (
      (organizationsMap as Record<string, { code: string; name: string }[]>)[code.toLowerCase()] || []
    ).map(({ code }) => code);
    return countryCodes.includes(countryCode);
  });
};

const getCountries = async (): Promise<any[]> => {
  try {
    const url = 'https://restcountries.com/v3.1/all';
    const response: Response = await fetch(url);
    const countries = await response.json();
    return countries
      .map((country: any) => {
        const { cca3 = '' } = country;
        const area: number = country.area || 0;
        const population: number = country.population || 0;
        const borders: string[] = country.borders || [];
        const density: number = area === 0 ? 0 : Math.round(population / area);
        const organizations: { code: string; name: string }[] = getOrganizations(cca3);
        return { ...country, density, borders, organizations };
      })
      .sort((a: any, b: any) => (a.cca3 > b.cca3 ? 1 : -1));
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
  let currenciesMap: Record<string, { name: string; symbol: string }> = {};
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
    timezones = [...new Set([...countryTimezones, ...timezones])];
  }
  // Process Languages Map
  const languageCodes = Object.keys(languagesMap);
  const languageList = languageCodes
    .map((code: string) => {
      const name: string = languagesMap[code];
      const languageCountries = unitedNationMembers.filter(({ languages = {} }) =>
        Object.keys(languages || {}).includes(code)
      );
      const total = languageCountries.length;
      const languageCountryCodes = languageCountries.map(({ cca3 }: { cca3: string }) => cca3);
      const population: number = languageCountries
        .map(({ population }) => population)
        .reduce((previous: number, current: number) => previous + current, 0);
      return { code, name, total, population, countries: languageCountryCodes };
    })
    .filter(({ total }) => total > 0)
    .sort((a, b) => (a.total < b.total ? 1 : -1));
  // Process Currencies Map
  const currencyCodes = Object.keys(currenciesMap);
  const currenciesList: { code: string; name: string; symbol: string }[] = currencyCodes
    .map((code: string) => {
      const currency: { name: string; symbol: string } = currenciesMap[code];
      const { name = '', symbol = '' } = currency;
      const currencyCountries = unitedNationMembers.filter(({ currencies = {} }) =>
        Object.keys(currencies || {}).includes(code)
      );
      const total: number = currencyCountries.length;
      const currencyCountryCodes: string[] = currencyCountries.map(({ cca3 }: { cca3: string }) => cca3);
      return { name, code, symbol, total, countries: currencyCountryCodes };
    })
    .filter(({ total }) => total > 0)
    .sort((a, b) => (a.total < b.total ? 1 : -1));
  // Process Timezones
  const timezonesList: { name: string; total: number; countries: string[] }[] = timezones
    .map((timezone: string) => {
      const utcOffset: string = timezone.replace('UTC', '') || '+00:00';
      const [hourString = '00', minute = '00'] = utcOffset.split(':');
      const hour = parseInt(hourString);
      const offset = hour + (hour > 0 ? 1 : -1) * parseFloat((parseInt(minute) / 60).toFixed(2));
      const timezoneCountries = unitedNationMembers.filter(({ timezones: countryTimezones = [] }) =>
        countryTimezones.includes(timezone)
      );
      const total = timezoneCountries.length;
      const timezoneCountryCodes = timezoneCountries.map(({ cca3 }: { cca3: string }) => cca3);
      const timezones: string[] = timezoneDetails
        .filter(({ utc_offset = '' }: { utc_offset: string }) => utc_offset === utcOffset)
        .map(({ timezone }) => timezone);
      return { name: timezone, offset, total, countries: timezoneCountryCodes, timezones };
    })
    .sort((a, b) => (a.offset > b.offset ? 1 : -1));
  // Languages
  if (Object.keys(languagesMap).length > 0)
    writeFileSync(`${basePath}/languages/map.json`, JSON.stringify(languagesMap, null, 2));
  if (languageList.length > 0) writeFileSync(`${basePath}/languages/list.json`, JSON.stringify(languageList, null, 2));
  // Currencies
  if (Object.keys(currenciesMap).length > 0)
    writeFileSync(`${basePath}/currencies/map.json`, JSON.stringify(currenciesMap, null, 2));
  if (currenciesList.length > 0)
    writeFileSync(`${basePath}/currencies/list.json`, JSON.stringify(currenciesList, null, 2));
  // Timezones
  if (timezonesList.length > 0)
    writeFileSync(`${basePath}/timezones/list.json`, JSON.stringify(timezonesList, null, 2));
  // Codes
  if (Object.keys(isoAlpha2Codes).length > 0)
    writeFileSync(`${basePath}/codes/iso-alpha-2.json`, JSON.stringify(isoAlpha2Codes, null, 2));
  if (Object.keys(isoAlpha3Codes).length > 0)
    writeFileSync(`${basePath}/codes/iso-alpha-3.json`, JSON.stringify(isoAlpha3Codes, null, 2));
};

main().catch(console.error);
