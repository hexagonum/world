import csvToJson from 'csvtojson';
import { writeFileSync } from 'fs';
import path from 'path';

const main = async () => {
  const folderPath = path.join(__dirname, '../..');
  const citiesFilePath = `${folderPath}/csv/cities/cities.csv`;
  const cities = await csvToJson().fromFile(citiesFilePath);
  const processedCities = cities.map((city) => {
    return {
      ...city,
      latitude: parseFloat(city.latitude || '0') || 0,
      longitude: parseFloat(city.longitude || '0') || 0,
      timezone: parseFloat(city.timezone || '0') || 0,
    };
  });
  writeFileSync(
    './json/raw/cities.json',
    JSON.stringify(processedCities, null, 2)
  );
};

main().catch(console.error);
