import { writeFileSync } from 'fs';

const main = async () => {
  const url = 'https://restcountries.com/v3.1/all';
  const response: Response = await fetch(url);
  const countries = await response.json();
  if (countries.length > 0) writeFileSync(`./json/raw/countries.json`, JSON.stringify(countries, null, 2));
  process.exit(0);
};

main().catch(console.error);
