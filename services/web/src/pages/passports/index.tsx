import { Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { NEXT_PUBLIC_BASE_API } from '@world/configs';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type Passport = {
  commonName: string;
  cca2: string;
  cca3: string;
  passportGlobalRank: string;
  passportIndividualRank: string;
  passportMobilityScore: string;
};

type PassportsPageProps = {
  passports: Passport[];
};

const PassportsPage: NextPage<PassportsPageProps> = ({ passports = [] }) => {
  const [query, setQuery] = useState<string>('');

  const filterdPassports = passports.filter(({ commonName = '', cca2 = '', cca3 = '' }) => {
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
                      cca3 = '',
                      commonName = '',
                      passportMobilityScore = 0,
                      passportGlobalRank = 0,
                      passportIndividualRank = 0,
                    }) => {
                      return (
                        <Tr key={cca3}>
                          <Td>{passportGlobalRank}</Td>
                          <Td>{passportIndividualRank}</Td>
                          <Td>
                            <Link href={`/passports/${cca3}`}>{commonName}</Link>
                          </Td>
                          <Td isNumeric>{passportMobilityScore}</Td>
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
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/countries/passports`);
    const passports: Passport[] = await response.json();
    return { props: { passports } };
  } catch (error) {
    console.error(error);
    return { props: { passports: [] } };
  }
};

export default PassportsPage;
