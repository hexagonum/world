import { Badge, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import isoAlpha3Codes from '@world/data/codes/iso-alpha-3.json';
import unitedNationMembers from '@world/data/united-nation-members.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const clonedUnitedNationMembers = JSON.parse(JSON.stringify(unitedNationMembers));
clonedUnitedNationMembers.sort((a: any, b: any) => (a.borders.length > b.borders.length ? -1 : 1));

export const BordersPage: NextPage = () => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = clonedUnitedNationMembers.filter(({ name: { common = '' }, borders = [] }) => {
    const names: string[] = borders.map((border: string) => (isoAlpha3Codes as Record<string, string>)[border]);
    const codeFlag: boolean =
      query !== '' ? borders.some((code: string) => code.toLowerCase().includes(query.toLowerCase())) : true;
    const nameFlag: boolean =
      query !== '' ? names.some((name: string) => name.toLowerCase().includes(query.toLowerCase())) : true;
    const commonFlag: boolean = query !== '' ? common.toLowerCase().includes(query.toLowerCase()) : true;
    return codeFlag || nameFlag || commonFlag;
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
                      <Th>Borders</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(({ name: { common = '' }, cca3 = '', borders = [] }) => {
                      return (
                        <Tr key={common}>
                          <Td>
                            <Link href={`/countries/${cca3}`}>{common}</Link>
                          </Td>
                          <Td isNumeric>{borders.length}</Td>
                          <Td>
                            <div className="whitespace-normal">
                              {borders.length > 0 ? (
                                <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                  {borders.map((border: string) => {
                                    const name: string = (isoAlpha3Codes as Record<string, string>)[border] || '';
                                    return (
                                      <Link key={border} href={`/countries/${border}`}>
                                        <Badge colorScheme="teal">{name}</Badge>
                                      </Link>
                                    );
                                  })}
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
                    <p className="pb-4">Borders ({countriesByFilter.length})</p>
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

export default BordersPage;
