import { Card, CardBody, Divider } from '@chakra-ui/react';
import { Container } from '@weather/components/Container';
import { Weather } from '@weather/components/Weather';
import { cities } from '@weather/data/cities';
import trendsByCountries from '@weather/data/trends.json';
import { Layout } from '@weather/layout';
import { City } from '@weather/types';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CountryPage: NextPage = () => {
  const { query } = useRouter();
  const country: string = query.country?.toString().replaceAll('-', ' ') || '';
  const citiesByCountry = cities.filter(
    ({ country: cityCountry }) => country.toLowerCase() === cityCountry.toLowerCase()
  );

  const trendsByCountry: { trends: string[] } = trendsByCountries.find(
    ({ country: trendCountry }) => country.toLowerCase() === trendCountry.toLowerCase()
  ) || { trends: [] };
  const { trends = [] } = trendsByCountry;

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <h1 className="capitalize text-xl font-bold">{country}</h1>
            <h2 className="font-semibold">Weather ({citiesByCountry.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {citiesByCountry.map(({ id, name, latitude, longitude, timezone }: City) => (
                <Weather key={id} city={name} latitude={latitude} longitude={longitude} timezone={timezone} />
              ))}
            </div>
            <Divider className="border-gray-300" />
            <h2 className="font-semibold">Google Trends ({trends.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {trends.map((trend: string) => {
                const query: string = encodeURIComponent(trend);
                const href: string = `https://www.google.com/search?q=${query}`;
                return (
                  <Card key={trend} className="border border-gray-200">
                    <CardBody>
                      <Link href={href} target="_blank">
                        <p className="truncate">{trend}</p>
                      </Link>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CountryPage;
