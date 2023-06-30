import { Divider, Input } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { Weather } from '@world/components/Weather';
import { apolloClient } from '@world/graphql';
import { CITIES_QUERY } from '@world/graphql/queries/cities';
import { Layout } from '@world/layout';
import { City, Country } from '@world/types';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

export const WeatherPage: NextPage<{ cities: City[] }> = ({ cities = [] }) => {
  const [query, setQuery] = useState<string>('');

  const filterCities: City[] = cities.filter(
    ({ city = '', country = {} as Country }: City) => {
      const cityFlag =
        query !== '' ? city.toLowerCase().includes(query.toLowerCase()) : true;
      const countryFlag = country
        ? country.commonName.toLowerCase().includes(query.toLowerCase())
        : true;
      return cityFlag || countryFlag;
    }
  );
  const countries: string[] = [
    ...new Set(filterCities.map(({ country }) => country.commonName)),
  ];
  const citiesByCountries = countries.map((country) => {
    const citiesByCountry = filterCities.filter(
      ({ country: { commonName } }) => country === commonName
    );
    return { country, cities: citiesByCountry };
  });

  return (
    <Layout
      searchSection={
        <>
          <Input
            id="query"
            name="query"
            value={query}
            placeholder="Query"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setQuery(event.target.value)
            }
            className="shadow"
          />
        </>
      }
    >
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-8">
            {citiesByCountries.map(({ country = '', cities = [] }) => {
              return (
                <div key={country} className="flex flex-col gap-4">
                  <h2 className="text-md font-medium">
                    {country} ({cities.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {cities.map(
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
                  <Divider />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{
  props: { cities: City[] };
}> => {
  try {
    const data = await apolloClient.query<{ cities: City[] }>({
      query: CITIES_QUERY,
    });
    const cities: City[] = [...data.data.cities];
    return { props: { cities } };
  } catch (error) {
    console.error(error);
    return { props: { cities: [] } };
  }
};

export default WeatherPage;
