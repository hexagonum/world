import { Divider, Input } from '@chakra-ui/react';
import Container from '@weather/components/Container';
import { Weather } from '@weather/components/Weather';
import { cities } from '@weather/data/cities';
import { Layout } from '@weather/layout';
import { City } from '@weather/types';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

export const HomePage: NextPage = () => {
  const [query, setQuery] = useState<string>('');

  const filterCities: City[] = cities.filter(({ name, country }: City) => {
    const nameFlag = query !== '' ? name.toLowerCase().includes(query.toLowerCase()) : true;
    const countryFlag = country !== '' ? country.toLowerCase().includes(query.toLowerCase()) : true;
    return nameFlag || countryFlag;
  });
  const countries: string[] = [...new Set(filterCities.map(({ country }) => country))];
  const citiesByCountries = countries.map((country) => {
    const citiesByCountry = filterCities.filter(({ country: cityCountry }) => country === cityCountry);
    return { country, cities: citiesByCountry };
  });

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4">
            <Input
              id="query"
              name="query"
              value={query}
              placeholder="Query"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
              size="lg"
            />
            <Divider />
            {citiesByCountries.map(({ country = '', cities = [] }) => {
              return (
                <div key={country} className="flex flex-col gap-4">
                  <h2 className="text-md font-medium">
                    <Link href={`/${country.toLowerCase().replaceAll(' ', '-')}`}>
                      {country} ({cities.length})
                    </Link>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {cities.map(({ id, name, latitude, longitude, timezone }: City) => (
                      <Weather key={id} city={name} latitude={latitude} longitude={longitude} timezone={timezone} />
                    ))}
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

export default HomePage;
