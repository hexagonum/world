import { writeFileSync } from 'fs';
import countries from '../../json/raw/countries.json';
import trends from '../../json/raw/google-trends.json';

const main = async () => {
  const googleTrends: { countryCode: string; queries: string[] }[] =
    Object.keys(trends).map((key: string) => {
      const countryName = key.replace('_', ' ');
      const country: any = countries.find(
        ({ name: { common = '', official = '' } }) =>
          countryName.toLowerCase() === common.toLowerCase() ||
          countryName.toLowerCase() === official.toLowerCase()
      ) ?? { cca3: '' };
      const { cca3: countryCode = '' } = country;
      const queries: string[] = (
        (trends as Record<string, string[]>)[key] || []
      ).sort((a: string, b: string) => (a > b ? 1 : -1));
      return { countryCode, queries };
    });
  googleTrends.sort((a, b) => (a.countryCode > b.countryCode ? 1 : -1));
  if (googleTrends.length > 0)
    writeFileSync(
      './json/transformed/google-trends.json',
      JSON.stringify(googleTrends, null, 2)
    );
};

main().catch((error) => console.error(error));
