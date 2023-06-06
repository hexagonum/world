import { Divider, Input } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { apolloClient } from '@world/graphql';
import { COUNTRIES_QUERY } from '@world/graphql/queries/countries';
import { Layout } from '@world/layout';
import { Country } from '@world/types';
import { unique } from '@world/utils/unique';
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type CountriesPageProps = {
  countries: Country[];
};

export const CountriesPage: NextPage<CountriesPageProps> = ({ countries = [] }) => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = countries.filter(
    ({ commonName = '', region = '', subregion = '', cca2 = '', cca3 = '', fifa = '' }) => {
      const cca2Flag: boolean = query !== '' ? cca2.toLowerCase().includes(query.toLowerCase()) : true;
      const cca3Flag: boolean = query !== '' ? cca3.toLowerCase().includes(query.toLowerCase()) : true;
      const fifaFlag: boolean = query !== '' ? fifa.toLowerCase().includes(query.toLowerCase()) : true;
      const commonNameFlag: boolean = query !== '' ? commonName.toLowerCase().includes(query.toLowerCase()) : true;
      const regionFlag: boolean = query !== '' ? region.toLowerCase().includes(query.toLowerCase()) : true;
      const subregionFlag: boolean = query !== '' ? subregion.toLowerCase().includes(query.toLowerCase()) : true;
      return cca2Flag || cca3Flag || fifaFlag || commonNameFlag || regionFlag || subregionFlag;
    }
  );
  const regions: string[] = [...new Set(countriesByFilter.map(({ region = '' }) => region))].sort(
    (a: string, b: string) => (a > b ? 1 : -1)
  );
  const countriesByRegions: {
    region: string;
    total: number;
    subregions: { subregion: string; countries: Country[] }[];
  }[] = regions.map((region: string) => {
    const countriesByRegions: Country[] = countriesByFilter.filter(
      ({ region: countryRegion }) => region === countryRegion
    );
    const subregions: string[] = unique(countriesByRegions.map(({ subregion = '' }) => subregion)).sort(
      (a: string, b: string) => (a > b ? 1 : -1)
    );
    const countriesBySubregions: { subregion: string; countries: Country[] }[] = subregions.map((subregion: string) => {
      const countries: Country[] = countriesByRegions
        .filter(({ subregion: countrySubregion }: Country) => subregion === countrySubregion)
        .sort((a, b) => (a.commonName > b.commonName ? 1 : -1));
      return { subregion, countries };
    });
    return { region, total: countriesByRegions.length, subregions: countriesBySubregions };
  });

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <Input
              id="query"
              name="query"
              placeholder="Query"
              value={query}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
              className="shadow"
            />
            {countriesByRegions.map(({ region = '', total = 0, subregions = [] }) => {
              return (
                <div key={region} className="flex flex-col gap-4 md:gap-8">
                  <h2 className="text-lg">
                    {region} ({total})
                  </h2>
                  <div className="flex flex-col gap-4 md:gap-8">
                    {subregions.map(({ subregion = '', countries = [] }) => {
                      return (
                        <div key={subregion} className="flex flex-col gap-2 md:gap-4">
                          <h3>
                            {subregion} ({countries.length})
                          </h3>
                          <Divider className="border-gray-200" />
                          {countries.map(({ commonName = '', cca2 = '', cca3 = '', fifa = 'N/A', flag = '' }) => {
                            return (
                              <div key={cca2} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <p>{flag}</p>
                                  <Link href={`/countries/${cca3}`}>
                                    <pre className="inline">{cca2}</pre> - <pre className="inline">{cca3}</pre> -{' '}
                                    <pre className="inline">{fifa || 'N/A'}</pre> -{' '}
                                    <pre className="inline">{commonName}</pre>
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                  <Divider className="border-gray-200" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
): Promise<{ props: { countries: Country[] } }> => {
  try {
    const data = await apolloClient.query<{ countries: Country[] }>({ query: COUNTRIES_QUERY });
    const countries = data.data.countries;
    return { props: { countries } };
  } catch (error) {
    console.error(error);
    return { props: { countries: [] } };
  }
};

export default CountriesPage;
