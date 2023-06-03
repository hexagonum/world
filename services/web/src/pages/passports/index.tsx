import { Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { apolloClient } from '@world/graphql';
import { PASSPORTS_QUERY } from '@world/graphql/queries/passports';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type Passport = {
  country: { commonName: string; cca2: string; cca3: string; region: string; subregion: string };
  globalRank: number;
  individualRank: number;
  mobilityScore: number;
};

type PassportsPageProps = {
  passports: Passport[];
};

const PassportsPage: NextPage<PassportsPageProps> = ({ passports = [] }) => {
  const [query, setQuery] = useState<string>('');

  const filterdPassports = passports.filter(({ country: { commonName = '', cca2 = '', cca3 } }) => {
    const cca2Flag: boolean = query !== '' ? cca2.toLowerCase().includes(query.toLowerCase()) : true;
    const cca3Flag: boolean = query !== '' ? cca3.toLowerCase().includes(query.toLowerCase()) : true;
    const commonNameFlag: boolean = query !== '' ? commonName.toLowerCase().includes(query.toLowerCase()) : true;
    return cca2Flag || cca3Flag || commonNameFlag;
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
            <TableContainer className="border rounded shadow">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Global Rank</Th>
                    <Th>Individual Rank</Th>
                    <Th>Country</Th>
                    <Th isNumeric>Mobility Score</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filterdPassports.map(
                    ({
                      country: { cca2 = '', cca3 = '', commonName = '' },
                      mobilityScore = 0,
                      globalRank = 0,
                      individualRank = 0,
                    }) => {
                      return (
                        <Tr key={cca3}>
                          <Td>{globalRank}</Td>
                          <Td>{individualRank}</Td>
                          <Td>
                            <Link href={`/passports/${cca3}`}>{commonName}</Link>
                          </Td>
                          <Td isNumeric>{mobilityScore}</Td>
                        </Tr>
                      );
                    }
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{ props: { passports: Passport[] } }> => {
  try {
    const data = await apolloClient.query<{ passports: Passport[] }>({ query: PASSPORTS_QUERY });
    const passports: Passport[] = data.data.passports;
    return { props: { passports } };
  } catch (error) {
    console.error(error);
    return { props: { passports: [] } };
  }
};

export default PassportsPage;
