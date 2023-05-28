import { writeFileSync } from 'fs';

const main = async () => {
  const url = 'https://worldtimeapi.org/api/timezone';
  const response: Response = await fetch(url);
  const timezones = await response.json();
  if (timezones.length > 0) writeFileSync('./src/data/timezones/all.json', JSON.stringify(timezones, null, 2));
  const details = [];
  for (const timezone of timezones) {
    console.log(timezone);
    const [region] = timezone.split('/');
    const url = 'https://worldtimeapi.org/api/timezone';
    const response: Response = await fetch(`${url}/${timezone}`);
    const detail = await response.json();
    details.push({ ...detail, region });
    if (details.length > 0) writeFileSync('./src/data/timezones/details.json', JSON.stringify(details, null, 2));
  }
  process.exit(0);
};

main().catch(console.error);
