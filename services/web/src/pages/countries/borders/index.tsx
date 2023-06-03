import { Badge, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import isoAlpha3Codes from '@world/data/codes/iso-alpha-3.json';
import { apolloClient } from '@world/graphql';
import { COUNTRIES_BORDERS_QUERY } from '@world/graphql/queries/countries';
import Layout from '@world/layout';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type Country = { commonName: string; cca3: string; borders: string[] };

type BordersPageProps = {
  countries: Country[];
};

export const BordersPage: NextPage<BordersPageProps> = ({ countries = [] }) => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = countries.filter(({ commonName = '', borders = [] }) => {
    const names: string[] = borders.map((border: string) => (isoAlpha3Codes as Record<string, string>)[border]);
    const codeFlag: boolean =
      query !== '' ? borders.some((code: string) => code.toLowerCase().includes(query.toLowerCase())) : true;
    const nameFlag: boolean =
      query !== '' ? names.some((name: string) => name.toLowerCase().includes(query.toLowerCase())) : true;
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
                      <Th>Borders</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(({ commonName = '', cca3 = '', borders = [] }) => {
                      return (
                        <Tr key={cca3}>
                          <Td>
                            <Link href={`/countries/${cca3}`}>{commonName}</Link>
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

export const getStaticProps: GetStaticProps = async (): Promise<{ props: { countries: Country[] } }> => {
  try {
    const data = await apolloClient.query<{ countries: Country[] }>({ query: COUNTRIES_BORDERS_QUERY });
    const countries: Country[] = [...data.data.countries];
    countries.sort((a, b) => b.borders.length - a.borders.length);
    return { props: { countries } };
  } catch (error) {
    console.error(error);
    return { props: { countries: [] } };
  }
};

export default BordersPage;
