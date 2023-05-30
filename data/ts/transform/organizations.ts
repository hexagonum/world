import csvToJson from 'csvtojson';
import { writeFileSync } from 'fs';
import path from 'path';

const main = async () => {
  const folderPath = path.join(__dirname, '../..');
  const organizationsFilePath = `${folderPath}/csv/organizations/organizations.csv`;
  const organizations = await csvToJson().fromFile(organizationsFilePath);
  const processedOrganizations = [];
  for (const organization of organizations) {
    const { code } = organization;
    const membersFilePath = `${folderPath}/csv/organizations/countries/${code.toLowerCase()}.csv`;
    const members = await csvToJson().fromFile(membersFilePath);
    processedOrganizations.push({ ...organization, members });
  }
  writeFileSync('./json/raw/organizations.json', JSON.stringify(processedOrganizations, null, 2));
};

main().catch(console.error);
