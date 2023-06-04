import { writeFileSync } from 'fs';

const main = async () => {
  const url = 'https://trends.google.com/trends/hottrends/visualize/internal/data';
  const response: Response = await fetch(url);
  const data: Record<string, string[]> = await response.json();
  const rawFile = './json/raw/google-trends.json';
  if (Object.keys(data).length > 0) writeFileSync(rawFile, JSON.stringify(data, null, 2));
};

main().catch((error) => console.error(error));
