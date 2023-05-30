import { Badge, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import unitedNationMembers from '@world/data/united-nation-members.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const clonedUnitedNationMembers = JSON.parse(JSON.stringify(unitedNationMembers));
clonedUnitedNationMembers.sort((a: any, b: any) => (a.organizations.length > b.organizations.length ? -1 : 1));

export const OrganizationsPage: NextPage = () => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = clonedUnitedNationMembers.filter(({ name: { common = '' }, organizations = [] }) => {
    const commonFlag: boolean = query !== '' ? common.toLowerCase().includes(query.toLowerCase()) : true;
    const organizationsFlag: boolean =
      query !== ''
        ? organizations.some(
            ({ code = '', name = '' }) =>
              code.toLowerCase().includes(query.toLowerCase()) || name.toLowerCase().includes(query.toLowerCase())
          )
        : true;
    return commonFlag || organizationsFlag;
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
                      <Th isNumeric>Total</Th>
                      <Th>Organizations</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(
                      ({ name: { common = '' }, cca3 = '', organizations = [] }, index: number) => {
                        return (
                          <Tr key={common}>
                            <Td>{index + 1}</Td>
                            <Td>
                              <Link href={`/countries/${cca3}`}>{common}</Link>
                            </Td>
                            <Td isNumeric>{organizations.length}</Td>
                            <Td>
                              {organizations.length > 0 ? (
                                <div className="flex flex-wrap gap-1 md:gap-2">
                                  {organizations.map(({ code, name }: { code: string; name: string }) => {
                                    return (
                                      <Link key={code} href={`/organizations/${code}`}>
                                        <Badge colorScheme="teal">{name}</Badge>
                                      </Link>
                                    );
                                  })}
                                </div>
                              ) : (
                                <></>
                              )}
                            </Td>
                          </Tr>
                        );
                      }
                    )}
                  </Tbody>
                  <TableCaption>
                    <p className="pb-4">Organizations ({countriesByFilter.length})</p>
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

export default OrganizationsPage;
