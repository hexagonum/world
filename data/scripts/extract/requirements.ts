import { Element, load } from 'cheerio';
import { writeFileSync } from 'fs';
import passports from '../../json/raw/passports/passports.json';

const getRequirements = async (id: string): Promise<Record<string, string>> => {
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
      const singleId: string = paths[paths.length - 1];
      const { cca2 = '' } = passports.find(({ id }) => singleId === id) ?? { cca2: '' };
      const requirement: string = $row.find('td:nth-child(2)').text();
      requirements[cca2] = requirement;
    });
  return requirements;
};

const main = async () => {
  const getRequirementsAsync = passports.map(async ({ id, cca2 }) => {
    const value = await getRequirements(id);
    return { key: cca2, value };
  });
  await Promise.all(getRequirementsAsync)
    .then((responses) => {
      const requirements: Record<string, Record<string, string>> = {};
      responses.forEach(({ key, value }) => {
        requirements[key] = value;
      });
      writeFileSync(`./json/raw/passports/requirements.json`, JSON.stringify(requirements, null, 2));
    })
    .catch(console.error);
  process.exit(0);
};

main().catch(console.error);
