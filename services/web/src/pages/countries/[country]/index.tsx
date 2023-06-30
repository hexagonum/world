import { useQuery } from '@apollo/client';
import {
  Badge,
  Card,
  CardBody,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import Articles from '@world/components/Articles';
import { Container } from '@world/components/Container';
import { Videos } from '@world/components/Videos';
import { Weather } from '@world/components/Weather';
import isoAlpha3Codes from '@world/data/codes/iso-alpha-3.json';
import { COUNTRY_QUERY } from '@world/graphql/queries/countries';
import { Layout } from '@world/layout';
import { City, Country } from '@world/types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CodeSection: React.FC<{ country: Country }> = ({ country }) => {
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
                  <b>Top-level Domain ({country.topLevelDomains.length})</b>
                </Link>
              </Td>
              <Td>
                <p className="whitespace-normal text-right">
                  {country.topLevelDomains
                    .map((domain: string) => domain)
                    .join(', ')}
                </p>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Divider className="border-gray-300" />
    </section>
  );
};

const GeographySection: React.FC<{ country: Country }> = ({ country }) => {
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
                <Link href={country.googleMaps} target="_blank">
                  <Badge colorScheme="teal" variant="outline" className="px-2">
                    <span>
                      {country.latitude}&deg;{country.latitude >= 0 ? 'N' : 'S'}
                    </span>
                    {', '}
                    <span>
                      {country.longitude}&deg;
                      {country.longitude >= 0 ? 'E' : 'W'}
                    </span>
                  </Badge>
                </Link>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Link href="/countries/timezones">
                  <b>Timezones ({country.timezones.length})</b>
                </Link>
              </Td>
              <Td>
                <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                  {country.timezones.map((timezone: string) => (
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
                  <b>Borders ({country.borders.length})</b>
                </Link>
              </Td>
              <Td>
                <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                  {country.borders.map((border: string) => {
                    return (
                      <Link key={`/${border}`} href={`/countries/${border}`}>
                        <Badge colorScheme="teal">
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
      <Divider className="border-gray-300" />
    </section>
  );
};

const PopulationSection: React.FC<{ country: Country }> = ({ country }) => {
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
                {country.density} people/km<sup>2</sup>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Divider className="border-gray-300" />
    </section>
  );
};

const OrganizationsSection: React.FC<{
  organizations?: { code: string; name: string }[];
}> = ({ organizations = [] }) => {
  if (organizations.length === 0) {
    return <></>;
  }

  return (
    <section className="flex flex-col gap-4 md:gap-8">
      <h2 className="font-semibold text-xl">
        <Link href="/countries/organizations">Organizations</Link>
      </h2>
      <TableContainer className="border rounded shadow">
        <Table>
          <Tbody>
            {organizations.map(
              ({ code, name = '' }: { code: string; name: string }) => {
                return (
                  <Tr key={code}>
                    <Td>
                      <Link href={`/organizations/${code}`}>
                        <b>{code}</b>
                      </Link>
                    </Td>
                    <Td isNumeric>{name}</Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Divider className="border-gray-300" />
    </section>
  );
};

const NewsSection: React.FC<{ cca2: string }> = ({ cca2 = '' }) => {
  return (
    <section className="flex flex-col gap-4 md:gap-8">
      <h2 className="font-semibold text-xl">
        <Link href="/news">News</Link>
      </h2>
      <Articles country={cca2.toLowerCase()} />
      <Divider className="border-gray-300" />
    </section>
  );
};

const YouTubeSection: React.FC<{
  title: string;
  categoryId: string;
  countryCode: string;
  maxResults: number;
}> = ({ title = '', categoryId = '', countryCode = '', maxResults = 8 }) => {
  return (
    <section className="flex flex-col gap-4 md:gap-8">
      <h2 className="font-semibold text-xl">{title}</h2>
      <Videos
        categoryId={categoryId}
        countryCode={countryCode.toUpperCase()}
        maxResults={maxResults}
      />
      <Divider className="border-gray-300" />
    </section>
  );
};

const CountryMain: React.FC<{ code: string }> = ({ code = '' }) => {
  const { loading, error, data } = useQuery<{ country: Country }>(
    COUNTRY_QUERY,
    { variables: { code } }
  );

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

  if (!data?.country) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <p className="text-center">No Data</p>
        </CardBody>
      </Card>
    );
  }

  const country = data.country;

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <h1 className="capitalize text-4xl font-bold">
            {country.commonName}
          </h1>
          <Image
            src={country.flagSVG}
            alt={country.commonName}
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
                <Td isNumeric>{country.officialName}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Link href="/countries/currencies">
                    <b>Currencies ({country.currencies.length})</b>
                  </Link>
                </Td>
                <Td>
                  <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                    {country.currencies.map(({ code, name }) => {
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
                  <Link href="/countries/languages">
                    <b>Languages ({country.languages.length})</b>
                  </Link>
                </Td>
                <Td>
                  <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                    {country.languages.map(({ code, name }) => {
                      return (
                        <Link key={code} href={`/languages/${code}`}>
                          <Badge colorScheme="teal">{name}</Badge>
                        </Link>
                      );
                    })}
                  </div>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Divider className="border-gray-300" />
      </div>
      <CodeSection country={country} />
      <GeographySection country={country} />
      <PopulationSection country={country} />
      <OrganizationsSection organizations={country.organizations} />
      {(country.cities || []).length > 0 ? (
        <>
          <div className="flex flex-col gap-4 md:gap-8">
            <h2 className="font-semibold text-xl">
              Weather ({(country.cities || []).length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {(country.cities || []).map(
                ({ id, city, latitude, longitude, timezone }: City) => (
                  <Weather
                    key={id}
                    city={city}
                    latitude={latitude}
                    longitude={longitude}
                    timezone={timezone}
                  />
                )
              )}
            </div>
          </div>
          <Divider className="border-gray-300" />
        </>
      ) : (
        <></>
      )}
      {(country.googleTrends || []).length > 0 ? (
        <div className="flex flex-col gap-4 md:gap-8">
          <h2 className="font-semibold text-xl">
            Google Trends ({country.googleTrends.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {country.googleTrends.map((query: string) => {
              const encodedQuery: string = encodeURIComponent(query);
              const googleUrl: string = `https://www.google.com/search?q=${encodedQuery}`;
              return (
                <Card key={query} className="border border-gray-200">
                  <CardBody>
                    <Link href={googleUrl} target="_blank">
                      <p className="truncate">{query}</p>
                    </Link>
                  </CardBody>
                </Card>
              );
            })}
          </div>
          <Divider className="border-gray-300" />
        </div>
      ) : (
        <></>
      )}
      {country.cca2.length > 0 ? <NewsSection cca2={country.cca2} /> : <></>}
      {country.cca2.length > 0 ? (
        <YouTubeSection
          title={'YouTube General'}
          categoryId={''}
          countryCode={country.cca2}
          maxResults={8}
        />
      ) : (
        <></>
      )}
      {country.cca2.length > 0 ? (
        <YouTubeSection
          title={'YouTube Music'}
          categoryId={'10'}
          countryCode={country.cca2}
          maxResults={8}
        />
      ) : (
        <></>
      )}
      {country.cca2.length > 0 ? (
        <YouTubeSection
          title={'YouTube Sports'}
          categoryId={'17'}
          countryCode={country.cca2}
          maxResults={8}
        />
      ) : (
        <></>
      )}
      {country.cca2.length > 0 ? (
        <YouTubeSection
          title={'YouTube News'}
          categoryId={'25'}
          countryCode={country.cca2}
          maxResults={8}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

const CountryPage: NextPage = () => {
  const { query } = useRouter();
  const countryCode: string = query.country?.toString() ?? '';

  if (!countryCode) return <></>;

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <CountryMain code={countryCode} />
        </div>
      </Container>
    </Layout>
  );
};

export default CountryPage;
