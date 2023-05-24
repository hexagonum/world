import { Card, CardBody, Divider, Select } from '@chakra-ui/react';
import { Container } from '@weather/components/Container';
import trends from '@weather/data/trends.json';
import { Layout } from '@weather/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

const TrendsPage: NextPage = () => {
  const router = useRouter();

  const [filterOptions, setFilterOptions] = useState<{
    region: string;
    subregion: string;
    country: string;
  }>({
    region: router.query.region?.toString() || '',
    subregion: router.query.subregion?.toString() || '',
    country: router.query.country?.toString() || '',
  });

  const regions: string[] = [...new Set(trends.map(({ region }) => region))].sort();
  const subregions: string[] = [
    ...new Set(
      trends
        .filter(({ region }) => (filterOptions.region !== '' ? filterOptions.region === region : true))
        .map(({ subregion }) => subregion)
    ),
  ].sort();
  const countries: string[] = trends
    .filter(
      ({ region, subregion }) =>
        (filterOptions.region !== '' ? filterOptions.region === region : true) &&
        (filterOptions.subregion !== '' ? filterOptions.subregion === subregion : true)
    )
    .map(({ country }) => country);
  const trendsByFilter: string[] = [
    ...new Set(
      trends
        .filter(({ region, subregion, country }) => {
          const regionFlag: boolean = filterOptions.region !== '' ? filterOptions.region === region : true;
          const subregionFlag: boolean = filterOptions.subregion !== '' ? filterOptions.subregion === subregion : true;
          const countryFlag: boolean = filterOptions.country !== '' ? filterOptions.country === country : true;
          return regionFlag && subregionFlag && countryFlag;
        })
        .map(({ trends }) => trends)
        .flat(1)
    ),
  ].sort();

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <Select
                  id="region"
                  name="region"
                  placeholder="Region"
                  className="capitalize shadow"
                  value={filterOptions.region}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    const region = event.target.value;
                    router.replace({ query: { ...router.query, region } });
                    setFilterOptions({ region, subregion: '', country: '' });
                  }}
                >
                  {regions.map((region: string) => {
                    return (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div className="col-span-1">
                <Select
                  id="subregion"
                  name="subregion"
                  placeholder="Subregion"
                  className="capitalize shadow"
                  value={filterOptions.subregion}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    const subregion: string = event.target.value;
                    router.replace({ query: { ...router.query, subregion } });
                    setFilterOptions({
                      ...filterOptions,
                      subregion,
                      country: '',
                    });
                  }}
                >
                  {subregions.map((subregion: string) => {
                    return (
                      <option key={subregion} value={subregion}>
                        {subregion}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div className="col-span-1">
                <Select
                  id="country"
                  name="country"
                  placeholder="Country"
                  className="capitalize shadow"
                  value={filterOptions.country}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    const country: string = event.target.value;
                    router.replace({ query: { ...router.query, country } });
                    setFilterOptions({ ...filterOptions, country });
                  }}
                >
                  {countries.map((country: string) => {
                    return (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trendsByFilter.map((trend: string) => {
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
        </div>
      </Container>
    </Layout>
  );
};

export default TrendsPage;
