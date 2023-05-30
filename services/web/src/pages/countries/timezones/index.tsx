import { Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import unitedNationMembers from '@world/data/united-nation-members.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const clonedUnitedNationMembers = JSON.parse(JSON.stringify(unitedNationMembers));
clonedUnitedNationMembers.sort((a: any, b: any) => (a.timezones.length > b.timezones.length ? -1 : 1));

export const TopLevelDomainsPage: NextPage = () => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = clonedUnitedNationMembers.filter(({ name: { common = '' }, timezones = [] }) => {
    const timezonesFlag: boolean =
      query !== '' ? timezones.some((timezone: string) => timezone.toLowerCase().includes(query.toLowerCase())) : true;
    const commonFlag: boolean = query !== '' ? common.toLowerCase().includes(query.toLowerCase()) : true;
    return timezonesFlag || commonFlag;
  });

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <Input
              id="query"
              name="query"
              placeholder="Query"
              value={query}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
              className="shadow"
            />
            <div className="shadow">
              <TableContainer className="border rounded">
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Country ({countriesByFilter.length})</Th>
                      <Th isNumeric>Total</Th>
                      <Th>Timezones</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(({ name: { common = '' }, cca3 = '', timezones = [] }) => {
                      return (
                        <Tr key={common}>
                          <Td>
                            <Link href={`/countries/${cca3}`}>{common}</Link>
                          </Td>
                          <Td isNumeric>{timezones.length}</Td>
                          <Td>
                            <div className="whitespace-normal">
                              {timezones.length > 0 ? (
                                <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                  {timezones.map((domain: string) => domain).join(', ')}
                                </div>
                              ) : (
                                <p>Island Nation</p>
                              )}
                            </div>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                  <TableCaption>
                    <p className="pb-4">Timezones ({countriesByFilter.length})</p>
                  </TableCaption>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default TopLevelDomainsPage;
