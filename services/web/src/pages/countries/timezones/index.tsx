import { Badge, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { apolloClient } from '@world/graphql';
import { COUNTRIES_TIMEZONES_QUERY } from '@world/graphql/queries/countries';
import Layout from '@world/layout';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type Country = { code: string; commonName: string; timezones: string[] };

type TimezonesPageProps = {
  countries: Country[];
};

export const TimezonesPage: NextPage<TimezonesPageProps> = ({ countries }) => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = countries.filter(({ commonName = '', timezones = [] }) => {
    const timezonesFlag: boolean =
      query !== '' ? timezones.some((timezone: string) => timezone.toLowerCase().includes(query.toLowerCase())) : true;
    const commonNameFlag: boolean = query !== '' ? commonName.toLowerCase().includes(query.toLowerCase()) : true;
    return timezonesFlag || commonNameFlag;
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
                    {countriesByFilter.map(({ commonName, code = '', timezones = [] }) => {
                      return (
                        <Tr key={code}>
                          <Td>
                            <Link href={`/countries/${code}`}>{commonName}</Link>
                          </Td>
                          <Td isNumeric>{timezones.length}</Td>
                          <Td>
                            <div className="whitespace-normal">
                              {timezones.length > 0 ? (
                                <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                  {timezones.map((timezone) => (
                                    <Link key={timezone} href={`/timezones/${timezone}`}>
                                      <Badge colorScheme="teal">{timezone}</Badge>
                                    </Link>
                                  ))}
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

export const getStaticProps: GetStaticProps = async (): Promise<{ props: { countries: Country[] } }> => {
  try {
    const data = await apolloClient.query<{ countries: Country[] }>({ query: COUNTRIES_TIMEZONES_QUERY });
    const countries: Country[] = [...data.data.countries];
    countries.sort((a, b) => b.timezones.length - a.timezones.length);
    return { props: { countries } };
  } catch (error) {
    console.error(error);
    return { props: { countries: [] } };
  }
};

export default TimezonesPage;
