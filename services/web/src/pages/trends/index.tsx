import { Card, CardBody, Divider, Select } from '@chakra-ui/react';
import { Container } from '@world/components/Container';
import { BASE_API } from '@world/configs';
import useFetch from '@world/hooks/use-fetch';
import { Layout } from '@world/layout';
import { unique } from '@world/utils/unique';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

type TrendsByCountry = {
  commonName: string;
  region: string;
  subregion: string;
  googleTrends: string[];
};

type GoogleTrendsPageProps = {
  trendsByCountries: TrendsByCountry[];
};

type FilterOption = { region: string; subregion: string; country: string };

type FilterOptions = { regions: string[]; subregions: string[]; countries: string[] };

const buildFilterOptions = (trendsByCountries: TrendsByCountry[], filterOption: FilterOption): FilterOptions => {
  // Regions
  const regions: string[] = unique(trendsByCountries.map(({ region = '' }) => region));
  regions.sort((a: string, b: string) => (a > b ? 1 : -1));
  // Subregions
  const subregions: string[] = unique(
    trendsByCountries
      .filter(({ region = '' }) => (filterOption.region !== '' ? filterOption.region === region : true))
      .map(({ subregion = '' }) => subregion)
  );
  subregions.sort((a: string, b: string) => (a > b ? 1 : -1));
  // Countries
  const countries: string[] = trendsByCountries
    .filter(
      ({ region, subregion }) =>
        (filterOption.region !== '' ? filterOption.region === region : true) &&
        (filterOption.subregion !== '' ? filterOption.subregion === subregion : true)
    )
    .map(({ commonName }) => commonName);
  countries.sort((a: string, b: string) => (a > b ? 1 : -1));
  // Filter Options
  return { regions, subregions, countries };
};

type GoogleTrendsFilterProps = {
  filterOption: FilterOption;
  filterOptions: FilterOptions;
  setFilterOptions: Dispatch<SetStateAction<FilterOption>>;
};

const GoogleTrendsFilter: React.FC<GoogleTrendsFilterProps> = ({
  filterOption,
  filterOptions,
  setFilterOptions = (_filterOption: FilterOption) => {},
}) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1">
        <Select
          id="region"
          name="region"
          placeholder="Region"
          className="capitalize shadow"
          value={filterOption.region}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            const region: string = event.target.value;
            router.replace({ query: { ...router.query, region } }).catch(console.error);
            setFilterOptions({ region, subregion: '', country: '' });
          }}
        >
          {filterOptions.regions.map((region: string) => {
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
          value={filterOption.subregion}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            const subregion: string = event.target.value;
            router.replace({ query: { ...router.query, subregion } }).catch(console.error);
            setFilterOptions({
              ...filterOption,
              subregion,
              country: '',
            });
          }}
        >
          {filterOptions.subregions.map((subregion: string) => {
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
          value={filterOption.country}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            const country: string = event.target.value;
            router.replace({ query: { ...router.query, country } }).catch(console.error);
            setFilterOptions({ ...filterOption, country });
          }}
        >
          {filterOptions.countries.map((country: string) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

type GoogleTrendsByCountriesProps = {
  filterOption: FilterOption;
  initialTrendsByCountries: TrendsByCountry[];
};

const GoogleTrendsByCountries: React.FC<GoogleTrendsByCountriesProps> = ({
  filterOption,
  initialTrendsByCountries = [],
}) => {
  const { loading, error, data } = useFetch<TrendsByCountry[]>(`${BASE_API}/countries/google/trends`);

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
          <p className="text-center">Error</p>
        </CardBody>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <p className="text-center">No Data</p>
        </CardBody>
      </Card>
    );
  }

  const trendsByCountries = data || initialTrendsByCountries;

  const trendsByFilteredCountries: string[] = unique(
    trendsByCountries
      .filter(({ region, subregion, commonName }) => {
        const regionFlag: boolean = filterOption.region !== '' ? filterOption.region === region : true;
        const subregionFlag: boolean = filterOption.subregion !== '' ? filterOption.subregion === subregion : true;
        const countryFlag: boolean = filterOption.country !== '' ? filterOption.country === commonName : true;
        return regionFlag && subregionFlag && countryFlag;
      })
      .map(({ googleTrends = [] }) => googleTrends)
      .flat(1)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {trendsByFilteredCountries.map((trend: string) => {
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
  );
};

const GoogleTrendsPage: NextPage<GoogleTrendsPageProps> = ({ trendsByCountries = [] }) => {
  // Filter
  const router = useRouter();
  const [filterOption, setFilterOptions] = useState<FilterOption>({
    region: router.query.region?.toString() ?? '',
    subregion: router.query.subregion?.toString() ?? '',
    country: router.query.country?.toString() ?? '',
  });
  const filterOptions = buildFilterOptions(trendsByCountries, filterOption);

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4">
            <GoogleTrendsFilter
              filterOption={filterOption}
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            />
            <Divider />
            <GoogleTrendsByCountries filterOption={filterOption} initialTrendsByCountries={trendsByCountries} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{ props: { trendsByCountries: TrendsByCountry[] } }> => {
  try {
    const response = await fetch(`${BASE_API}/countries/google/trends`);
    const trendsByCountries: TrendsByCountry[] = await response.json();
    return { props: { trendsByCountries } };
  } catch (error) {
    console.error(error);
    return { props: { trendsByCountries: [] } };
  }
};

export default GoogleTrendsPage;
