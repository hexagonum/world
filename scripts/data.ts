import { writeFileSync } from 'fs';

const getCountries = async (): Promise<any[]> => {
  try {
    const url = 'https://restcountries.com/v3.1/all';
    const response: Response = await fetch(url);
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const main = async () => {
  const countries = await getCountries();
  writeFileSync('./src/data/countries.json', JSON.stringify(countries, null, 2));
  const url: string = 'https://trends.google.com/trends/hottrends/visualize/internal/data';
  const response: Response = await fetch(url);
  const data = await response.json();
  const trends: { country: string; region: string; trends: string[] }[] = Object.keys(data).map((key: string) => {
    const country = key.replace('_', ' ');
    const trends = (data[key] || []).sort();
    const { region = '', subregion = '' } =
      countries.find(
        ({ name: { common = '', official = '' } }: { name: { common: string; official: string } }) =>
          common.toLowerCase() === country.toLowerCase() || official.toLowerCase() === country.toLowerCase()
      ) || {};
    return {
      country,
      region: region.toLowerCase(),
      subregion: subregion.toLowerCase(),
      trends,
    };
  });
  trends.sort((a, b) => (a.country > b.country ? 1 : -1));
  writeFileSync('./src/data/trends.json', JSON.stringify(trends, null, 2));
};

main().catch((error) => console.error(error));
