import { writeFileSync } from 'fs';
import timezones from '../../json/raw/timezones.json';

const main = async () => {
  const transformedTimezones = timezones.map(({ abbreviation, timezone, utc_offset }) => ({
    code: abbreviation,
    name: timezone,
    offset: utc_offset,
    utcOffset: `UTC${utc_offset}`,
  }));
  writeFileSync('./json/transformed/timezones.json', JSON.stringify(transformedTimezones, null, 2));
};

main().catch(console.error);
