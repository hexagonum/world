import { readFileSync, writeFileSync } from 'fs';
import passports from '../../src/data/passports/passports.json';

const main = async () => {
  const requirements: Record<string, Record<string, string>> = {};
  for (const passport of passports) {
    const { id } = passport;
    const countryRequirementsString = readFileSync(`./src/data/passports/requirements/${id}.json`, 'utf-8');
    const countryRequirements = JSON.parse(countryRequirementsString);
    requirements[id] = countryRequirements;
  }
  writeFileSync(`./src/data/passports/requirements.json`, JSON.stringify(requirements, null, 2));
  process.exit(0);
};

main().catch(console.error);
