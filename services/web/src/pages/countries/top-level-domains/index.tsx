import { Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { apolloClient } from '@world/graphql';
import { COUNTRIES_TOP_LEVEL_DOMAINS_QUERY } from '@world/graphql/queries/countries';
import Layout from '@world/layout';
import { Country } from '@world/types';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type TopLevelDomainsPageProps = {
  countries: Country[];
};

export const TopLevelDomainsPage: NextPage<TopLevelDomainsPageProps> = ({ countries = [] }) => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = countries.filter(({ commonName = '', topLevelDomains = [] }) => {
    const topLevlDomainsFlag: boolean =
      query !== '' ? topLevelDomains.some((code: string) => code.toLowerCase().includes(query.toLowerCase())) : true;
    const commonNameFlag: boolean = query !== '' ? commonName.toLowerCase().includes(query.toLowerCase()) : true;
    return topLevlDomainsFlag || commonNameFlag;
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
                      <Th>Top-level Domains</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(({ commonName = '', cca3 = '', topLevelDomains = [] }) => {
                      return (
                        <Tr key={cca3}>
                          <Td>
                            <Link href={`/countries/${cca3}`}>{commonName}</Link>
                          </Td>
                          <Td isNumeric>{topLevelDomains.length}</Td>
                          <Td>
                            <div className="whitespace-normal">
                              {topLevelDomains.length > 0 ? (
                                <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                  {topLevelDomains.map((domain: string) => domain).join(', ')}
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
                    <p className="pb-4">Top-level Domains ({countriesByFilter.length})</p>
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
    const data = await apolloClient.query<{ countries: Country[] }>({ query: COUNTRIES_TOP_LEVEL_DOMAINS_QUERY });
    const countries: Country[] = [...data.data.countries];
    countries.sort((a, b) => b.topLevelDomains.length - a.topLevelDomains.length);
    return { props: { countries } };
  } catch (error) {
    console.error(error);
    return { props: { countries: [] } };
  }
};

export default TopLevelDomainsPage;
