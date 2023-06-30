import { writeFileSync } from 'fs';

const main = async () => {
  const url = 'https://worldtimeapi.org/api/timezone';
  const response: Response = await fetch(url);
  const timezones = await response.json();
  if (timezones.length === 0) {
    return;
  }
  const details = [];
  for (const timezone of timezones) {
    console.log(timezone);
    const response: Response = await fetch(`${url}/${timezone}`);
    const detail = await response.json();
    details.push(detail);
    if (details.length > 0)
      writeFileSync(
        './json/raw/timezones.json',
        JSON.stringify(details, null, 2)
      );
  }
  process.exit(0);
};

main().catch(console.error);
