import { Badge, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import unitedNationMembers from '@world/data/united-nation-members.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const clonedUnitedNationMembers = JSON.parse(JSON.stringify(unitedNationMembers));
clonedUnitedNationMembers.sort((a: any, b: any) =>
  Object.keys(a.languages).length > Object.keys(b.languages).length ? -1 : 1
);

export const LanguagesPage: NextPage = () => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = clonedUnitedNationMembers.filter(({ name: { common = '' }, languages = {} }) => {
    const languageCodes: string[] = Object.keys(languages);
    const languageNames: string[] = Object.values(languages);
    const codeFlag: boolean =
      query !== '' ? languageCodes.some((code: string) => code.toLowerCase().includes(query.toLowerCase())) : true;
    const nameFlag: boolean =
      query !== '' ? languageNames.some((name: string) => name.toLowerCase().includes(query.toLowerCase())) : true;
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
                      <Th>Languages</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(({ name: { common = '' }, cca3 = '', languages = {} }) => {
                      const languageCodes: string[] = Object.keys(languages);

                      return (
                        <Tr key={common}>
                          <Td>
                            <Link href={`/countries/${cca3}`}>{common}</Link>
                          </Td>
                          <Td isNumeric>{Object.keys(languages).length}</Td>
                          <Td>
                            {languageCodes.length > 0 ? (
                              <div className="flex flex-wrap gap-1 md:gap-2">
                                {languageCodes.map((code: string) => {
                                  const name: string = (languages as Record<string, string>)[code] || '';
                                  return (
                                    <Link key={code} href={`/languages/${code}`}>
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
                    })}
                  </Tbody>
                  <TableCaption>
                    <p className="pb-4">Languages ({countriesByFilter.length})</p>
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

export default LanguagesPage;
