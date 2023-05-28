import { load, Element } from 'cheerio';
import passports from '../src/data/passports/passports.json';
import { writeFileSync } from 'fs';

const main = async () => {
  for (const passport of passports) {
    const { id } = passport;
    console.log(id);
    const url = `https://www.passportindex.org/passport/${id}`;
    const response = await fetch(url);
    const data: string = await response.text();
    const $ = load(data);
    const requirements: Record<string, string> = {};
    $('#psprt-dashboard-table tbody')
      .find('tr')
      .map((_index: number, row: Element) => {
        const $row = $(row);
        const href = $row.find('td:nth-child(1) a').attr('href') ?? '';
        const paths: string[] = href.split('/').filter((path: string) => path);
        const id: string = paths[paths.length - 1];
        const requirement: string = $row.find('td:nth-child(2)').text();
        requirements[id] = requirement;
      });
    writeFileSync(`./src/data/passports/requirements/${id}.json`, JSON.stringify(requirements, null, 2));
  }
  process.exit(0);
};

main().catch(console.error);
