import { Badge, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { apolloClient } from '@world/graphql';
import { COUNTRIES_CURRENCIES_QUERY } from '@world/graphql/queries/countries';
import Layout from '@world/layout';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type Country = { commonName: string; cca3: string; currencies: { code: string; name: string; symbol: string }[] };

type CurrenciesPageProps = {
  countries: Country[];
};

export const CurrenciesPage: NextPage<CurrenciesPageProps> = ({ countries = [] }) => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = countries.filter(({ commonName = '', currencies = [] }) => {
    const currencyCodes: string[] = currencies.map(({ code = '' }: { code: string }) => code);
    const currencyNames: string[] = currencies.map(({ name = '' }: { name: string }) => name);
    const codeFlag: boolean =
      query !== '' ? currencyCodes.some((code: string) => code.toLowerCase().includes(query.toLowerCase())) : true;
    const nameFlag: boolean =
      query !== '' ? currencyNames.some((name: string) => name.toLowerCase().includes(query.toLowerCase())) : true;
    const commonNameFlag: boolean = query !== '' ? commonName.toLowerCase().includes(query.toLowerCase()) : true;
    return codeFlag || nameFlag || commonNameFlag;
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
                    {countriesByFilter.map(({ commonName = '', cca3 = '', currencies = [] }) => {
                      return (
                        <Tr key={cca3}>
                          <Td>
                            <Link href={`/countries/${cca3}`}>{commonName}</Link>
                          </Td>
                          <Td isNumeric>{currencies.length}</Td>
                          <Td>
                            <div className="whitespace-normal">
                              {currencies.length > 0 ? (
                                <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                  {currencies.map(({ code, name, symbol }) => {
                                    return (
                                      <Link key={code} href={`/currencies/${code}`}>
                                        <Badge colorScheme="teal">
                                          {symbol} - {name}
                                        </Badge>
                                      </Link>
                                    );
                                  })}
                                </div>
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

export const getStaticProps: GetStaticProps = async (): Promise<{ props: { countries: Country[] } }> => {
  try {
    const data = await apolloClient.query<{ countries: Country[] }>({ query: COUNTRIES_CURRENCIES_QUERY });
    const countries: Country[] = [...data.data.countries];
    countries.sort((a, b) => b.currencies.length - a.currencies.length);
    return { props: { countries } };
  } catch (error) {
    console.error(error);
    return { props: { countries: [] } };
  }
};

export default CurrenciesPage;
