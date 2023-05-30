import { Badge, Divider, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { Container } from '@world/components/Container';
import isoAlpha3Codes from '@world/data/codes/iso-alpha-3.json';
import timezones from '@world/data/timezones/list.json';
import unitedNationMembers from '@world/data/united-nation-members.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Timezone = { name: string; offset: number; total: number; countries: string[]; timezones: string[] };
const defaultTimezone: Timezone = {
  name: '',
  offset: 0,
  total: 0,
  countries: [],
  timezones: [],
};

const TimezonePage: NextPage = () => {
  const { query } = useRouter();
  const timezoneName: string = query.timezone?.toString() ?? '';
  const timezone: Timezone =
    timezones.find(({ name }) => name.toLowerCase() === timezoneName.toLowerCase()) ?? defaultTimezone;
  const timezoneCountries = unitedNationMembers.filter(({ cca3 }) => timezone.countries.includes(cca3));
  const regions: string[] = [...new Set(timezoneCountries.map(({ region }: { region: string }) => region))].sort(
    (a: string, b: string) => (a > b ? 1 : -1)
  );

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <h1 className="capitalize text-4xl font-bold">{timezone.name}</h1>
            <TableContainer className="shadow border rounded">
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Offset</Td>
                    <Td isNumeric>{timezone.offset}</Td>
                  </Tr>
                  <Tr>
                    <Td>Timezones ({timezone.timezones.length})</Td>
                    <Td>
                      <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                        {timezone.timezones.map((tz: string) => (
                          <Badge key={tz}>{tz}</Badge>
                        ))}
                      </div>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Divider className="border-gray-300" />
            <h2 className="font-semibold text-xl">Countries ({timezone.countries.length})</h2>{' '}
            <TableContainer className="shadow border rounded">
              <Table>
                <Tbody>
                  {regions.map((region: string) => {
                    const timezoneCountriesByRegion = timezoneCountries.filter(
                      ({ region: countryRegion }) => region === countryRegion
                    );
                    return (
                      <Tr key={region}>
                        <Td>
                          {region} ({timezoneCountriesByRegion.length})
                        </Td>
                        <Td isNumeric>
                          <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                            {timezoneCountriesByRegion.map(({ cca3 }) => {
                              return (
                                <Link key={cca3} href={`/countries/${cca3}`}>
                                  <Badge colorScheme="teal">
                                    {(isoAlpha3Codes as Record<string, string>)[cca3] || ''}
                                  </Badge>
                                </Link>
                              );
                            })}
                          </div>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default TimezonePage;
