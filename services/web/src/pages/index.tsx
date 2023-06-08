import { Badge, Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { Weather } from '@world/components/Weather';
import { apolloClient } from '@world/graphql';
import { HOME_QUERY } from '@world/graphql/queries/home';
import { Layout } from '@world/layout';
import { City, Passport } from '@world/types';
import { GoogleRank } from '@world/types/google';
import currencyFormatter from '@world/utils/currency-formatter';
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import Link from 'next/link';

type CountriesPageProps = {
  cities: City[];
  passports: Passport[];
  googleRanks: GoogleRank[];
  rates: { code: string; rate: number }[];
};

export const CountriesPage: NextPage<CountriesPageProps> = ({
  cities = [],
  googleRanks = [],
  rates = [],
  passports = [],
}) => {
  return (
    <Layout>
      <Container>
        <div className="p-4 md:p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {cities.map(({ id, city, latitude, longitude, timezone }: City) => (
                <div key={id} className="col-span-1">
                  <Weather city={city} latitude={latitude} longitude={longitude} timezone={timezone} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {googleRanks.length > 0 ? (
                <div className="col-span-1">
                  <TableContainer className="border rounded shadow">
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Google Trends ({googleRanks.length})</Th>
                          <Th isNumeric>Occurrences</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {googleRanks.map(({ rank, query, count }) => {
                          return (
                            <Tr key={rank}>
                              <Td>
                                <Link href={`https://google.com/search?q=${encodeURIComponent(query)}`} target="_blank">
                                  <Badge colorScheme="teal">{query}</Badge>
                                </Link>
                              </Td>
                              <Td isNumeric>
                                <b>{count}</b>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                      <TableCaption>
                        <Link href="/trends" className="uppercase">
                          <Button colorScheme="teal" className="w-full mb-4">
                            View Full Table
                          </Button>
                        </Link>
                      </TableCaption>
                    </Table>
                  </TableContainer>
                </div>
              ) : (
                <></>
              )}
              {rates.length > 0 ? (
                <div className="col-span-1">
                  <TableContainer className="border rounded shadow">
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>USD</Th>
                          <Th isNumeric>1000</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {rates.map(({ code, rate }) => {
                          return (
                            <Tr key={code}>
                              <Td>
                                <Link href={`/currencies/${code}`}>
                                  <Badge colorScheme="teal">{code}</Badge>
                                </Link>
                              </Td>
                              <Td isNumeric>{currencyFormatter(rate, code)}</Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                      <TableCaption>
                        <Link href="/currencies" className="uppercase">
                          <Button colorScheme="teal" className="w-full mb-4">
                            View Full Table
                          </Button>
                        </Link>
                      </TableCaption>
                    </Table>
                  </TableContainer>
                </div>
              ) : (
                <></>
              )}
              {passports.length > 0 ? (
                <div className="col-span-1">
                  <TableContainer className="border rounded shadow">
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Rank</Th>
                          <Th isNumeric>Country</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {passports.map(({ countryCode, individualRank, country: { commonName } }) => {
                          return (
                            <Tr key={countryCode}>
                              <Td>{individualRank}</Td>
                              <Td isNumeric>
                                <Link href={`/countries/${countryCode}`}>
                                  <Badge colorScheme="teal">{commonName}</Badge>
                                </Link>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                      <TableCaption>
                        <Link href="/passports" className="uppercase">
                          <Button colorScheme="teal" className="w-full mb-4">
                            View Full Table
                          </Button>
                        </Link>
                      </TableCaption>
                    </Table>
                  </TableContainer>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (
  _context: GetStaticPropsContext
): Promise<{
  props: { cities: City[]; googleRanks: GoogleRank[]; rates: { code: string; rate: number }[]; passports: Passport[] };
}> => {
  try {
    const data = await apolloClient.query<{
      cities: City[];
      rates: { code: string; rate: number }[];
      google: { ranks: GoogleRank[] };
      passports: Passport[];
    }>({ query: HOME_QUERY, variables: { amount: 1000, base: 'USD', limit: 10 } });
    const cities = [...data.data.cities]
      .filter(({ city }) => ['Hà Nội', 'Melbourne', 'Dallas'].includes(city))
      .sort((a, b) => (a.timezone > b.timezone ? 1 : -1));
    const rates = [...data.data.rates].splice(0, 10);
    const googleRanks = [...data.data.google.ranks];
    const passports = [...data.data.passports];
    return { props: { cities, googleRanks, rates, passports } };
  } catch (error) {
    console.error(error);
    return { props: { cities: [], googleRanks: [], rates: [], passports: [] } };
  }
};

export default CountriesPage;
