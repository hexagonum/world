import { writeFileSync } from 'fs';
import countries from '../src/data/countries.json';

const main = async () => {
  const url: string = 'https://trends.google.com/trends/hottrends/visualize/internal/data';
  const response: Response = await fetch(url);
  const data = await response.json();
  const trends: { country: string; region: string; trends: string[] }[] = Object.keys(data).map((key: string) => {
    const country = key.replace('_', ' ');
    const trends = (data[key] || []).sort();
    const {
      cca2 = '',
      region = '',
      subregion = '',
    } = countries.find(
      ({ name: { common = '', official = '' } }: { name: { common: string; official: string } }) =>
        common.toLowerCase() === country.toLowerCase() || official.toLowerCase() === country.toLowerCase()
    ) || ({} as any);
    return {
      id: cca2,
      country,
      region: region.toLowerCase(),
      subregion: subregion.toLowerCase(),
      trends,
    };
  });
  trends.sort((a, b) => (a.country > b.country ? 1 : -1));
  if (trends.length > 0) writeFileSync('./src/data/trends.json', JSON.stringify(trends, null, 2));
};

main().catch((error) => console.error(error));
