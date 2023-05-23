import { Button, Divider, Input, Link } from '@chakra-ui/react';
import Container from '@weather/components/Container';
import unitedNationMembers from '@weather/data/united-nation-members.json';
import { Layout } from '@weather/layout';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

export const HomePage: NextPage = () => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = unitedNationMembers.filter(
    ({ name: { common = '' }, region = '', subregion = '', cca2 = '', cca3 = '', fifa = '' }) => {
      const cca2Flag: boolean = query !== '' ? cca2.toLowerCase().includes(query.toLowerCase()) : true;
      const cca3Flag: boolean = query !== '' ? cca3.toLowerCase().includes(query.toLowerCase()) : true;
      const fifaFlag: boolean = query !== '' ? fifa.toLowerCase().includes(query.toLowerCase()) : true;
      const commonFlag: boolean = query !== '' ? common.toLowerCase().includes(query.toLowerCase()) : true;
      const regionFlag: boolean = query !== '' ? region.toLowerCase().includes(query.toLowerCase()) : true;
      const subregionFlag: boolean = query !== '' ? subregion.toLowerCase().includes(query.toLowerCase()) : true;
      return cca2Flag || cca3Flag || fifaFlag || commonFlag || regionFlag || subregionFlag;
    }
  );
  const regions: string[] = [...new Set(countriesByFilter.map(({ region = '' }) => region))].sort();
  const countriesByRegions: any[] = regions.map((region: string) => {
    const countriesByRegions: any[] = countriesByFilter.filter(({ region: countryRegion }) => region === countryRegion);
    const subregions: string[] = [...new Set(countriesByRegions.map(({ subregion = '' }) => subregion))].sort();
    const countriesBySubregions: any[] = subregions.map((subregion: string) => {
      const countries: any[] = countriesByRegions
        .filter(({ subregion: countrySubregion }: any) => subregion === countrySubregion)
        .sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
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
                          {countries.map(
                            ({
                              name: { common = '' } = { common: '' },
                              cca2 = '',
                              cca3 = '',
                              fifa = 'N/A',
                              flag = '',
                            }) => {
                              return (
                                <div key={cca2} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <p>{flag}</p>
                                    <p>
                                      <pre className="inline">{cca2}</pre> - <pre className="inline">{cca3}</pre> -{' '}
                                      <pre className="inline">{fifa}</pre> - <pre className="inline">{common}</pre>
                                    </p>
                                  </div>
                                  <Link href={`/${cca3}`}>
                                    <Button colorScheme="teal">Details</Button>
                                  </Link>
                                </div>
                              );
                            }
                          )}
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

export default HomePage;
