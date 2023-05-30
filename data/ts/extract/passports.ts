import { Element, load } from 'cheerio';
import { writeFileSync } from 'fs';

export type Passport = {
  id: string;
  name: string;
  cca2: string;
  globalRank: number;
  individualRank: number;
  mobilityScore: number;
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
      const cca2 = $anchor.attr('data-code') ?? '';
      const globalRank = $anchor.attr('data-rank') ?? '';
      const individualRank = $anchor.attr('data-irank') ?? '';
      const id = name.toLowerCase().replaceAll(' ', '-');
      passports.push({
        id,
        name,
        cca2: cca2.toUpperCase(),
        globalRank: parseInt(globalRank, 10),
        mobilityScore: parseInt(mobilityScore, 10),
        individualRank: parseInt(individualRank, 10),
      });
    });
  passports.sort((a, b) => (a.individualRank > b.individualRank ? 1 : -1));
  writeFileSync('./json/raw/passports/passports.json', JSON.stringify(passports, null, 2));
  process.exit(0);
};

main().catch(console.error);
