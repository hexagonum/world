import { writeFileSync } from 'fs';
import countries from '../../json/raw/countries.json';

const main = async () => {
  let languagesMap: Record<string, string> = {};
  for (const { languages } of countries) {
    languagesMap = { ...languagesMap, ...(languages as any) };
  }
  const languages = Object.keys(languagesMap)
    .map((code: string) => {
      const name: string = languagesMap[code];
      return { code, name };
    })
    .sort((a, b) => (a.code > b.code ? 1 : -1));
  writeFileSync('./json/raw/languages.json', JSON.stringify(languages, null, 2));
};

main().catch(console.error);
