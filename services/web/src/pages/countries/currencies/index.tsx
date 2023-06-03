import { Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import unitedNationMembers from '@world/data/united-nation-members.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const clonedUnitedNationMembers = JSON.parse(JSON.stringify(unitedNationMembers));
clonedUnitedNationMembers.sort((a: any, b: any) =>
  Object.keys(a.currencies).length > Object.keys(b.currencies).length ? -1 : 1
);

export const CurrenciesPage: NextPage = () => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = clonedUnitedNationMembers.filter(({ name: { common = '' }, currencies = {} }) => {
    const currencyCodes: string[] = Object.keys(currencies);
    const currencyNames: string[] = Object.values<{ name: string }>(currencies).map(
      ({ name = '' }: { name: string }) => name
    );
    const codeFlag: boolean =
      query !== '' ? currencyCodes.some((code: string) => code.toLowerCase().includes(query.toLowerCase())) : true;
    const nameFlag: boolean =
      query !== '' ? currencyNames.some((name: string) => name.toLowerCase().includes(query.toLowerCase())) : true;
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
                      <Th>Currencies</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(({ name: { common = '' }, cca3 = '', currencies = {} }) => {
                      return (
                        <Tr key={common}>
                          <Td>
                            <Link href={`/countries/${cca3}`}>{common}</Link>
                          </Td>
                          <Td isNumeric>{Object.keys(currencies).length}</Td>
                          <Td>
                            <div className="flex flex-col gap-2 md:gap-4">
                              {Object.keys(currencies).length > 0 ? (
                                <p className="whitespace-normal">
                                  {Object.keys(currencies)
                                    .map((code: string) => {
                                      const value: { name: string; symbol: string } =
                                        (currencies as Record<string, { name: string; symbol: string }>)[code] || '';
                                      return `${code} - ${value.name} (${value.symbol})`;
                                    })
                                    .sort((a, b) => (a > b ? 1 : -1))
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
                    <p className="pb-4">Currencies ({countriesByFilter.length})</p>
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
