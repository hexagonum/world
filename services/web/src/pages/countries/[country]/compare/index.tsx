import { Badge, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import isoAlpha3Codes from '@world/data/codes/iso-alpha-3.json';
import unitedNationMembers from '@world/data/united-nation-members.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const defaultCountry = {
  name: { common: '', official: '' },
  flags: { svg: '' },
  cca2: '',
  cca3: '',
  ccn3: '',
  cioc: '',
  fifa: '',
  region: '',
  subregion: '',
  tld: [],
  latlng: [0, 0],
  area: 0,
  density: 0,
  population: 0,
  maps: { googleMaps: '', openStreetMaps: '' },
  idd: { root: '', suffixes: [] },
  capital: [],
  languages: {},
  borders: [],
  currencies: {},
  timezones: [],
  organizations: [],
};

const ComparePage: NextPage = () => {
  const { query } = useRouter();
  const countryCode: string = query.country?.toString() ?? '';
  const [comparedCountryCode, setComparedCountryCode] = useState('');
  const country =
    unitedNationMembers.find(({ cca3 }) => cca3.toLowerCase() === countryCode.toLowerCase()) ?? defaultCountry;
  const comparedCountry =
    unitedNationMembers.find(({ cca3 }) => cca3.toLowerCase() === comparedCountryCode.toLowerCase()) ?? defaultCountry;

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex items-center justify-between">
              <h1 className="capitalize text-4xl font-bold">{country.name.common}</h1>
              <div>
                <Select
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={comparedCountryCode}
                  onChange={(event) => setComparedCountryCode(event.target.value)}
                  className="shadow"
                >
                  {unitedNationMembers
                    .filter(({ cca3 = '' }: { cca3: string }) => cca3 !== countryCode)
                    .map(({ name: { common = '' }, cca3 }) => {
                      return (
                        <option key={cca3} value={cca3}>
                          {common}
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
                      <Link href={`/countries/${country.cca3}`}>{country.name.common}</Link>
                    </Th>
                    <Th>
                      <Link href={`/countries/${comparedCountry.cca3}`}>{comparedCountry.name.common}</Link>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <b>Capital</b>
                    </Td>
                    <Td>{country.capital.join(', ')}</Td>
                    <Td>{comparedCountry.capital.join(', ')}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>Offical</b>
                    </Td>
                    <Td>{country.name.official}</Td>
                    <Td>{comparedCountry.name.official}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>Currencies</b>
                    </Td>
                    <Td>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {Object.keys(country.currencies).map((code: string) => {
                          const currency: { name: string; symbol: string } =
                            (country.currencies as Record<string, { name: string; symbol: string }>)[code] || '';
                          return (
                            <Link key={code} href={`/currencies/${code}`}>
                              <Badge colorScheme="teal">{currency.name}</Badge>
                            </Link>
                          );
                        })}
                      </div>
                    </Td>
                    <Td>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {Object.keys(comparedCountry.currencies).map((code: string) => {
                          const currency: { name: string; symbol: string } =
                            (comparedCountry.currencies as Record<string, { name: string; symbol: string }>)[code] ||
                            '';
                          return (
                            <Link key={code} href={`/currencies/${code}`}>
                              <Badge colorScheme="teal">{currency.name}</Badge>
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
                        {Object.keys(country.languages).map((code: string) => {
                          const name: string = (country.languages as Record<string, string>)[code] || '';
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
                        {Object.keys(comparedCountry.languages).map((code: string) => {
                          const name: string = (comparedCountry.languages as Record<string, string>)[code] || '';
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
                    <Td>{country.fifa}</Td>
                    <Td>{comparedCountry.fifa}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>IOC Code</b>
                    </Td>
                    <Td>{country.cioc}</Td>
                    <Td>{comparedCountry.cioc}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>ISO Alpha-2 Code</b>
                    </Td>
                    <Td>{country.cca2}</Td>
                    <Td>{comparedCountry.cca2}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>ISO Alpha-3 Code</b>
                    </Td>
                    <Td>{country.cca3}</Td>
                    <Td>{comparedCountry.cca3}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>ISO Numeric Code</b>
                    </Td>
                    <Td>{country.ccn3}</Td>
                    <Td>{comparedCountry.ccn3}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>Region</b>
                    </Td>
                    <Td>{country.region}</Td>
                    <Td>{comparedCountry.region}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>Subregion</b>
                    </Td>
                    <Td>{country.subregion}</Td>
                    <Td>{comparedCountry.subregion}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Link href="/countries/timezones">
                        <b>Timezones</b>
                      </Link>
                    </Td>
                    <Td>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {country.timezones.map((timezone: string) => (
                          <Link key={timezone} href={`/timezones/${timezone}`}>
                            <Badge colorScheme="teal">{timezone}</Badge>
                          </Link>
                        ))}
                      </div>
                    </Td>
                    <Td>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {comparedCountry.timezones.map((timezone: string) => (
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
                        {country.borders.map((border: string) => {
                          return (
                            <Link key={`/${border}`} href={`/countries/${border}`}>
                              <Badge colorScheme="teal">{(isoAlpha3Codes as Record<string, string>)[border]}</Badge>
                            </Link>
                          );
                        })}
                      </div>
                    </Td>
                    <Td>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {comparedCountry.borders.map((border: string) => {
                          return (
                            <Link key={`/${border}`} href={`/countries/${border}`}>
                              <Badge colorScheme="teal">{(isoAlpha3Codes as Record<string, string>)[border]}</Badge>
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
                    <Td>{country.population.toLocaleString()}</Td>
                    <Td>{comparedCountry.population.toLocaleString()}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Link href="/countries/area">
                        <b>Area</b>
                      </Link>
                    </Td>
                    <Td>{country.area.toLocaleString()}</Td>
                    <Td>{comparedCountry.area.toLocaleString()}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Link href="/countries/density">
                        <b>Density</b>
                      </Link>
                    </Td>
                    <Td>{country.density.toLocaleString()}</Td>
                    <Td>{comparedCountry.density.toLocaleString()}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Link href="/countries/organizations">
                        <b>Organizations</b>
                      </Link>
                    </Td>
                    <Td>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {country.organizations.map(({ code, name = '' }: { code: string; name: string }) => {
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
                        {comparedCountry.organizations.map(({ code, name = '' }: { code: string; name: string }) => {
                          return (
                            <Link key={code} href={`/organizations/${code}`}>
                              <Badge colorScheme="teal">{code}</Badge>
                            </Link>
                          );
                        })}
                      </div>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ComparePage;
