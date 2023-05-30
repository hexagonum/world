import { writeFileSync } from 'fs';
import countries from '../../json/raw/countries.json';

const main = async () => {
  let currenciesMap: Record<string, { name: string; symbol: string }> = {};
  for (const { currencies } of countries) {
    currenciesMap = { ...currenciesMap, ...(currencies as any) };
  }
  const currencies = Object.keys(currenciesMap)
    .map((code: string) => {
      const value: { name: string; symbol: string } = currenciesMap[code];
      return { ...value, code };
    })
    .sort((a, b) => (a.code > b.code ? 1 : -1));
  writeFileSync('./json/raw/currencies.json', JSON.stringify(currencies, null, 2));
};

main().catch(console.error);
