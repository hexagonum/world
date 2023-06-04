import { useQuery } from '@apollo/client';
import { Badge, Card, CardBody, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { COUNTRIES_QUERY } from '@world/graphql/queries/countries';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Country = {
  code: string;
  commonName: string;
  officialName: string;
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  fifa: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  density: number;
  capital: string[];
  borders: string[];
  timezones: string[];
  currencies: { code: string; name: string }[];
  languages: { code: string; name: string }[];
  organizations: { code: string; name: string }[];
};

const CompareMain: React.FC = () => {
  const { query } = useRouter();
  const countryCode: string = query.country?.toString() ?? '';
  const [comparedCountryCode, setComparedCountryCode] = useState('');

  const { loading, error, data } = useQuery<{ countries: Country[] }>(COUNTRIES_QUERY);

  if (loading) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <p className="text-center">Loading</p>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <p className="text-center">{error.message}</p>
        </CardBody>
      </Card>
    );
  }

  if (!data?.countries) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <p className="text-center">No Data</p>
        </CardBody>
      </Card>
    );
  }

  const country: Country | undefined = data.countries.find(
    ({ code }: Country) => code?.toLowerCase() === countryCode?.toLowerCase()
  );
  const comparedCountry: Country | undefined = data.countries.find(
    ({ code }: Country) => code?.toLowerCase() === comparedCountryCode?.toLowerCase()
  );
  const codeCountryMap: Record<string, string> = {};
  for (const country of data.countries) {
    const { code, commonName } = country;
    codeCountryMap[code] = commonName;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="capitalize text-4xl font-bold">{country?.commonName}</h1>
        <div>
          <Select
            id="country"
            name="country"
            placeholder="Country"
            value={comparedCountryCode}
            onChange={(event) => setComparedCountryCode(event.target.value)}
            className="shadow"
          >
            {data.countries
              .filter(({ code = '' }: Country) => code !== countryCode)
              .map(({ commonName, code }) => {
                return (
                  <option key={code} value={code}>
                    {commonName}
                  </option>
                );
              })}
          </Select>
        </div>
      </div>
      <TableContainer className="border rounded shadow">
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>
                <Link href={`/countries/${country?.code}`}>{country?.commonName}</Link>
              </Th>
              <Th>
                <Link href={`/countries/${comparedCountry?.code}`}>{comparedCountry?.commonName}</Link>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <b>Capital</b>
              </Td>
              <Td>{(country?.capital ?? []).join(', ')}</Td>
              <Td>{(comparedCountry?.capital ?? []).join(', ')}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>Offical</b>
              </Td>
              <Td>{country?.officialName}</Td>
              <Td>{comparedCountry?.officialName}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>Currencies</b>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {(country?.currencies ?? []).map(({ code, name }) => {
                    return (
                      <Link key={code} href={`/currencies/${code}`}>
                        <Badge colorScheme="teal">{name}</Badge>
                      </Link>
                    );
                  })}
                </div>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {(comparedCountry?.currencies ?? []).map(({ code, name }) => {
                    return (
                      <Link key={code} href={`/currencies/${code}`}>
                        <Badge colorScheme="teal">{name}</Badge>
                      </Link>
                    );
                  })}
                </div>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <b>Languages</b>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {(country?.languages ?? []).map(({ code, name }) => {
                    return (
                      <Link key={code} href={`/languages/${code}`}>
                        <Badge colorScheme="teal">{name}</Badge>
                      </Link>
                    );
                  })}
                </div>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {(comparedCountry?.languages ?? []).map(({ code, name }) => {
                    return (
                      <Link key={code} href={`/languages/${code}`}>
                        <Badge colorScheme="teal">{name}</Badge>
                      </Link>
                    );
                  })}
                </div>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <b>FIFA</b>
              </Td>
              <Td>{country?.fifa}</Td>
              <Td>{comparedCountry?.fifa}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>IOC Code</b>
              </Td>
              <Td>{country?.cioc}</Td>
              <Td>{comparedCountry?.cioc}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>ISO Alpha-2 Code</b>
              </Td>
              <Td>{country?.cca2}</Td>
              <Td>{comparedCountry?.cca2}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>ISO Alpha-3 Code</b>
              </Td>
              <Td>{country?.cca3}</Td>
              <Td>{comparedCountry?.cca3}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>ISO Numeric Code</b>
              </Td>
              <Td>{country?.ccn3}</Td>
              <Td>{comparedCountry?.ccn3}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>Region</b>
              </Td>
              <Td>{country?.region}</Td>
              <Td>{comparedCountry?.region}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>Subregion</b>
              </Td>
              <Td>{country?.subregion}</Td>
              <Td>{comparedCountry?.subregion}</Td>
            </Tr>
            <Tr>
              <Td>
                <Link href="/countries/timezones">
                  <b>Timezones</b>
                </Link>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {(country?.timezones ?? []).map((timezone: string) => (
                    <Link key={timezone} href={`/timezones/${timezone}`}>
                      <Badge colorScheme="teal">{timezone}</Badge>
                    </Link>
                  ))}
                </div>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {(comparedCountry?.timezones ?? []).map((timezone: string) => (
                    <Link key={timezone} href={`/timezones/${timezone}`}>
                      <Badge colorScheme="teal">{timezone}</Badge>
                    </Link>
                  ))}
                </div>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Link href="/countries/borders">
                  <b>Borders</b>
                </Link>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {(country?.borders ?? []).map((border: string) => {
                    return (
                      <Link key={`/${border}`} href={`/countries/${border}`}>
                        <Badge colorScheme="teal">{codeCountryMap[border]}</Badge>
                      </Link>
                    );
                  })}
                </div>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {comparedCountry?.borders.map((border: string) => {
                    return (
                      <Link key={`/${border}`} href={`/countries/${border}`}>
                        <Badge colorScheme="teal">{codeCountryMap[border]}</Badge>
                      </Link>
                    );
                  })}
                </div>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Link href="/countries/population">
                  <b>Population</b>
                </Link>
              </Td>
              <Td>{country?.population.toLocaleString()}</Td>
              <Td>{comparedCountry?.population.toLocaleString()}</Td>
            </Tr>
            <Tr>
              <Td>
                <Link href="/countries/area">
                  <b>Area</b>
                </Link>
              </Td>
              <Td>{country?.area.toLocaleString()}</Td>
              <Td>{comparedCountry?.area.toLocaleString()}</Td>
            </Tr>
            <Tr>
              <Td>
                <Link href="/countries/density">
                  <b>Density</b>
                </Link>
              </Td>
              <Td>{country?.density.toLocaleString()}</Td>
              <Td>{comparedCountry?.density.toLocaleString()}</Td>
            </Tr>
            <Tr>
              <Td>
                <Link href="/countries/organizations">
                  <b>Organizations</b>
                </Link>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {(country?.organizations ?? []).map(({ code, name = '' }: { code: string; name: string }) => {
                    return (
                      <Link key={code} href={`/organizations/${code}`}>
                        <Badge colorScheme="teal">{code}</Badge>
                      </Link>
                    );
                  })}
                </div>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {(comparedCountry?.organizations ?? []).map(
                    ({ code = '', name = '' }: { code: string; name: string }) => {
                      return (
                        <Link key={code} href={`/organizations/${code}`}>
                          <Badge colorScheme="teal">{name}</Badge>
                        </Link>
                      );
                    }
                  )}
                </div>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

const ComparePage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="p-8">
          <CompareMain />
        </div>
      </Container>
    </Layout>
  );
};

export default ComparePage;
