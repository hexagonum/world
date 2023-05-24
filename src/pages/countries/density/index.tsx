import { Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@weather/components/Container';
import unitedNationMembers from '@weather/data/united-nation-members.json';
import Layout from '@weather/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const clonedUnitedNationMembers = JSON.parse(JSON.stringify(unitedNationMembers));
clonedUnitedNationMembers.sort((a: any, b: any) => (a.density > b.density ? -1 : 1));

export const CurrenciesPage: NextPage = () => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = clonedUnitedNationMembers.filter(({ name: { common = '' } }) => {
    const commonFlag: boolean = query !== '' ? common.toLowerCase().includes(query.toLowerCase()) : true;
    return commonFlag;
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
                      <Th>No</Th>
                      <Th>Country ({countriesByFilter.length})</Th>
                      <Th isNumeric>
                        Density (people/km<sup>2</sup>)
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(({ name: { common = '' }, cca3 = '', density = 0 }, index: number) => {
                      return (
                        <Tr key={common}>
                          <Td>{index + 1}</Td>
                          <Td>
                            <Link href={`/countries/${cca3}`}>{common}</Link>
                          </Td>
                          <Td isNumeric>{density.toLocaleString()}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                  <TableCaption>
                    <p className="pb-4">Density ({countriesByFilter.length})</p>
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

export default CurrenciesPage;
