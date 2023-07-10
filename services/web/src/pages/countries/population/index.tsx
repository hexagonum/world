import {
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { log } from '@world/common/log';
import Container from '@world/components/Container';
import { apolloClient } from '@world/graphql';
import { COUNTRIES_POPULATION_QUERY } from '@world/graphql/queries/countries';
import Layout from '@world/layout';
import { Country } from '@world/types';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type PopulationPageProps = {
  countries: Country[];
};

export const PopulationPage: NextPage<PopulationPageProps> = ({
  countries = [],
}) => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = countries.filter(({ commonName = '' }) => {
    const commonNameFlag: boolean =
      query !== ''
        ? commonName.toLowerCase().includes(query.toLowerCase())
        : true;
    return commonNameFlag;
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
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setQuery(event.target.value)
              }
              className="shadow"
            />
            <div className="shadow">
              <TableContainer className="border rounded">
                <Table>
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Country ({countriesByFilter.length})</Th>
                      <Th isNumeric>Population</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(
                      (
                        { commonName = '', cca3 = '', population = 0 },
                        index: number
                      ) => {
                        return (
                          <Tr key={cca3}>
                            <Td>{index + 1}</Td>
                            <Td>
                              <Link href={`/countries/${cca3}`}>
                                {commonName}
                              </Link>
                            </Td>

                            <Td isNumeric>{population.toLocaleString()}</Td>
                          </Tr>
                        );
                      }
                    )}
                  </Tbody>
                  <TableCaption>
                    <p className="pb-4">
                      Population ({countriesByFilter.length})
                    </p>
                  </TableCaption>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: { countries: Country[] };
}> => {
  try {
    const data = await apolloClient.query<{ countries: Country[] }>({
      query: COUNTRIES_POPULATION_QUERY,
    });
    const countries: Country[] = [...data.data.countries];
    countries.sort((a, b) => b.population - a.population);
    return { props: { countries } };
  } catch (error) {
    log.error(`getStaticProps error=${error}`);
    return { props: { countries: [] } };
  }
};

export default PopulationPage;
