import { Badge, Card, CardBody, Divider, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { Container } from '@weather/components/Container';
import { Weather } from '@weather/components/Weather';
import { cities } from '@weather/data/cities';
import isoAlpha3Codes from '@weather/data/iso-alpha-3-codes.json';
import trendsByCountries from '@weather/data/trends.json';
import unitedNationMembers from '@weather/data/united-nation-members.json';
import { Layout } from '@weather/layout';
import { City } from '@weather/types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CodeSection: React.FC<{ country: any }> = ({ country }) => {
  return (
    <section className="flex flex-col gap-4 md:gap-8">
      <h2 className="font-semibold text-xl">Codes</h2>
      <TableContainer className="border rounded shadow">
        <Table>
          <Tbody>
            <Tr>
              <Td>
                <b>FIFA</b>
              </Td>
              <Td isNumeric>{country.fifa}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>IOC Code</b>
              </Td>
              <Td isNumeric>{country.cioc}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>ISO Alpha-2 Code</b>
              </Td>
              <Td isNumeric>{country.cca2}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>ISO Alpha-3 Code</b>
              </Td>
              <Td isNumeric>{country.cca3}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>ISO Numeric Code</b>
              </Td>
              <Td isNumeric>{country.ccn3}</Td>
            </Tr>
            <Tr>
              <Td>
                <Link href="/countries/top-level-domains">
                  <b>Top-level Domain ({country.tld.length})</b>
                </Link>
              </Td>
              <Td>
                <p className="whitespace-normal text-right">{country.tld.map((domain: string) => domain).join(', ')}</p>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <b>IDD Prefixes ({country.idd.suffixes.length})</b>
              </Td>
              <Td isNumeric>
                <p className="whitespace-normal text-right">
                  {country.idd.suffixes.map((suffix: string) => `${country.idd.root}${suffix}`).join(', ')}
                </p>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </section>
  );
};

const GeographySection: React.FC<{ country: any }> = ({ country }) => {
  return (
    <section className="flex flex-col gap-4 md:gap-8">
      <h2 className="font-semibold text-xl">Geography</h2>
      <TableContainer className="border rounded shadow">
        <Table>
          <Tbody>
            <Tr>
              <Td>
                <b>Region</b>
              </Td>
              <Td isNumeric>{country.region}</Td>
            </Tr>
            <Tr>
              <Td>
                <b>Subregion</b>
              </Td>
              <Td isNumeric>{country.subregion}</Td>
            </Tr>
            <Tr>
              <Td>
                <span className="hidden md:block">
                  <b>Latitude / Longitude</b>
                </span>
                <span className="block md:hidden">
                  <b>Lat / Lng</b>
                </span>
              </Td>
              <Td isNumeric>
                <Link href={country.maps.googleMaps} target="_blank">
                  <Badge colorScheme="teal" variant="outline" fontSize="sm" className="px-2">
                    <span>
                      {country.latlng[0]}&deg;{country.latlng[0] >= 0 ? 'N' : 'S'}
                    </span>
                    {', '}
                    <span>
                      {country.latlng[1]}&deg;
                      {country.latlng[1] >= 0 ? 'E' : 'W'}
                    </span>
                  </Badge>
                </Link>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Link href="/countries/borders">
                  <b>Borders ({country.borders.length})</b>
                </Link>
              </Td>
              <Td isNumeric>
                <div className="flex flex-wrap justify-end gap-2">
                  {country.borders.map((border: string) => {
                    return (
                      <Link key={`/${border}`} href={`/countries/${border}`}>
                        <Badge colorScheme="teal" fontSize="sm">
                          {(isoAlpha3Codes as Record<string, string>)[border]}
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </section>
  );
};

const PopulationSection: React.FC<{ country: any }> = ({ country }) => {
  return (
    <section className="flex flex-col gap-4 md:gap-8">
      <h2 className="font-semibold text-xl">Population</h2>
      <TableContainer className="border rounded shadow">
        <Table>
          <Tbody>
            <Tr>
              <Td>
                <Link href="/countries/population">
                  <b>Population</b>
                </Link>
              </Td>
              <Td isNumeric>{country.population.toLocaleString()}</Td>
            </Tr>
            <Tr>
              <Td>
                <Link href="/countries/area">
                  <b>Area</b>
                </Link>
              </Td>
              <Td isNumeric>
                {country.area.toLocaleString()} km<sup>2</sup>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Link href="/countries/density">
                  <b>Density</b>
                </Link>
              </Td>
              <Td isNumeric>
                {(country.population / country.area).toFixed(2)} people/km<sup>2</sup>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </section>
  );
};

const CountryPage: NextPage = () => {
  const { query } = useRouter();
  const countryCode: string = query.country?.toString() || '';
  const country = unitedNationMembers.find(({ cca3 }) => cca3.toLowerCase() === countryCode.toLowerCase()) || {
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
    population: 0,
    maps: { googleMaps: '', openStreetMaps: '' },
    idd: { root: '', suffixes: [] },
    capital: [],
    languages: {},
    borders: [],
    currencies: {},
  };
  const citiesByCountry = cities.filter(
    ({ country: cityCountry }) => country.name.common.toLowerCase() === cityCountry.toLowerCase()
  );
  const trendsByCountry: { trends: string[] } = trendsByCountries.find(
    ({ country: trendCountry }) => country.name.common.toLowerCase() === trendCountry.toLowerCase()
  ) || { trends: [] };
  const { trends = [] } = trendsByCountry;

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="flex items-center justify-between">
                <h1 className="capitalize text-4xl font-bold">{country.name.common}</h1>
                <Image
                  src={country.flags.svg}
                  alt={country.name.common}
                  width={64}
                  height={32}
                  className="border border-solid rounded"
                />
              </div>
              <TableContainer className="border rounded shadow">
                <Table>
                  <Tbody>
                    <Tr>
                      <Td>
                        <b>Capital</b>
                      </Td>
                      <Td isNumeric>{country.capital.join(', ')}</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <b>Official</b>
                      </Td>
                      <Td isNumeric>{country.name.official}</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Link href="/countries/currencies">
                          <b>Currencies ({Object.keys(country.currencies).length})</b>
                        </Link>
                      </Td>
                      <Td>
                        <p className="whitespace-normal text-right">
                          {Object.keys(country.currencies)
                            .map((key: string) => {
                              const value: { name: string; symbol: string } =
                                (country.currencies as Record<string, { name: string; symbol: string }>)[key] || '';
                              return `${key} - ${value.name} (${value.symbol})`;
                            })
                            .join(', ')}
                        </p>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Link href="/countries/languages">
                          <b>Languages ({Object.keys(country.languages).length})</b>
                        </Link>
                      </Td>
                      <Td>
                        <p className="whitespace-normal text-right">
                          {Object.keys(country.languages)
                            .map((key: string) => {
                              const value: string = (country.languages as Record<string, string>)[key] || '';
                              return `${value} (${key})`;
                            })
                            .join(', ')}
                        </p>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
            <Divider className="border-gray-300" />
            <CodeSection country={country} />
            <Divider className="border-gray-300" />
            <GeographySection country={country} />
            <Divider className="border-gray-300" />
            <PopulationSection country={country} />
            <Divider className="border-gray-300" />
            {citiesByCountry.length > 0 ? (
              <>
                <div className="flex flex-col gap-4 md:gap-8">
                  <h2 className="font-semibold text-xl">Weather ({citiesByCountry.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {citiesByCountry.map(({ id, name, latitude, longitude, timezone }: City) => (
                      <Weather key={id} city={name} latitude={latitude} longitude={longitude} timezone={timezone} />
                    ))}
                  </div>
                </div>
                <Divider className="border-gray-300" />
              </>
            ) : (
              <></>
            )}
            {trends.length > 0 ? (
              <div className="flex flex-col gap-4 md:gap-8">
                <h2 className="font-semibold text-xl">Google Trends ({trends.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                  {trends.map((trend: string) => {
                    const query: string = encodeURIComponent(trend);
                    const googleUrl: string = `https://www.google.com/search?q=${query}`;
                    return (
                      <Card key={trend} className="border border-gray-200">
                        <CardBody>
                          <Link href={googleUrl} target="_blank">
                            <p className="truncate">{trend}</p>
                          </Link>
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CountryPage;
