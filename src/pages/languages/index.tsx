import { Input, Link, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@weather/components/Container';
import unitedNationMembers from '@weather/data/united-nation-members.json';
import Layout from '@weather/layout';
import { NextPage } from 'next';
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
                      <Th>Total</Th>
                      <Th>Languages</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(({ name: { common = '', nativeName = {} }, cca3 = '', languages = {} }) => {
                      const nativeLanguageCodes: string[] = Object.keys(nativeName);
                      const allLanguageCodes: string[] = Object.keys(languages);
                      const nonNativeLanguageCodes: string[] = allLanguageCodes.filter(
                        (code: string) => !nativeLanguageCodes.includes(code)
                      );

                      return (
                        <Tr key={common}>
                          <Td>
                            <Link href={`/${cca3}`}>{common}</Link>
                          </Td>
                          <Td isNumeric>{Object.keys(languages).length}</Td>
                          <Td>
                            <div className="flex flex-col gap-2 md:gap-4">
                              {nativeLanguageCodes.length > 0 ? (
                                <p className="whitespace-normal">
                                  <b>Native Languages</b>:{' '}
                                  {nativeLanguageCodes
                                    .map((key: string) => {
                                      const value: string = (languages as Record<string, string>)[key] || '';
                                      return `${value} (${key})`;
                                    })
                                    .sort()
                                    .join(', ')}
                                </p>
                              ) : (
                                <></>
                              )}
                              {nonNativeLanguageCodes.length > 0 ? (
                                <p className="whitespace-normal">
                                  <b>Nonnative Languages</b>:{' '}
                                  {nonNativeLanguageCodes
                                    .map((key: string) => {
                                      const value: string = (languages as Record<string, string>)[key] || '';
                                      return `${value} (${key})`;
                                    })
                                    .sort()
                                    .join(', ')}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                  <TableCaption>
                    <p className="pb-4">Languages ({unitedNationMembers.length})</p>
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
