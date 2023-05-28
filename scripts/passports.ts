import { Element, load } from 'cheerio';
import { writeFileSync } from 'fs';
import countries from '../src/data/countries.json';

export type Passport = {
  id: string;
  name: string;
  cca2: string;
  cca3: string;
  globalRank: number;
  individualRank: number;
  mobilityScore: number;
};

const defaultCountry = {
  name: { common: '' },
  cca3: '',
};

const main = async () => {
  const url = 'https://www.passportindex.org/';
  const response = await fetch(url);
  const data: string = await response.text();
  const $ = load(data);
  const passports: Passport[] = [];
  $('#passports')
    .find('a')
    .map((_index: number, anchor: Element) => {
      const $anchor = $(anchor);
      const mobilityScore = $anchor.attr('data-ms') ?? '0';
      const name = $anchor.attr('data-cname') ?? '';
      const code = $anchor.attr('data-code') ?? '';
      const globalRank = $anchor.attr('data-rank') ?? '';
      const individualRank = $anchor.attr('data-irank') ?? '';
      const id = name.toLowerCase().replaceAll(' ', '-');
      const country = countries.find(({ cca2 }) => code.toLowerCase() === cca2.toLowerCase()) ?? defaultCountry;
      const {
        name: { common = '' },
        cca3 = '',
      } = country;
      passports.push({
        id,
        name: common,
        cca2: code.toUpperCase(),
        cca3,
        globalRank: parseInt(globalRank, 10),
        mobilityScore: parseInt(mobilityScore, 10),
        individualRank: parseInt(individualRank, 10),
      });
    });
  passports.sort((a, b) => (a.individualRank > b.individualRank ? 1 : -1));
  writeFileSync('./src/data/passports/passports.json', JSON.stringify(passports, null, 2));
  process.exit(0);
};

main().catch(console.error);
