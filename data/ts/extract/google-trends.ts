import { writeFileSync } from 'fs';

const main = async () => {
  const url = 'https://trends.google.com/trends/hottrends/visualize/internal/data';
  const response: Response = await fetch(url);
  const data = await response.json();
  const trends: { country: string; trends: string[] }[] = Object.keys(data).map((key: string) => {
    const country = key.replace('_', ' ');
    const trends = (data[key] || []).sort();
    return { country, trends };
  });
  trends.sort((a, b) => (a.country > b.country ? 1 : -1));
  if (trends.length > 0) writeFileSync('./json/raw/google-trends.json', JSON.stringify(trends, null, 2));
};

main().catch((error) => console.error(error));
