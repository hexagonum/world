import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { NEXT_PUBLIC_BASE_API } from '@world/configs';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';

type Language = {
  code: string;
  name: string;
  countries: { commonName: string; region: string; subregion: string; population: number }[];
};

type LanguagesPageProps = {
  languages: Language[];
};

const LanguagesPage: NextPage<LanguagesPageProps> = ({ languages = [] }) => {
  return (
    <Layout>
      <Container>
        <div className="p-8">
          <TableContainer className="border rounded shadow">
            <Table>
              <Thead>
                <Tr>
                  <Th>Languages ({languages.length})</Th>
                  <Th isNumeric>Countries</Th>
                  <Th isNumeric>Population</Th>
                </Tr>
              </Thead>
              <Tbody>
                {languages.map(({ code = '', name = '', countries = [] }) => {
                  const population: number = countries
                    .map(({ population = 0 }) => population)
                    .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);

                  return (
                    <Tr key={code}>
                      <Td>
                        <Link href={`/languages/${code}`}>{name}</Link>
                      </Td>
                      <Td isNumeric>{countries.length}</Td>
                      <Td isNumeric>{population.toLocaleString()}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{ props: { languages: Language[] } }> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/languages`);
    const languages: Language[] = await response.json();
    return { props: { languages } };
  } catch (error) {
    console.error(error);
    return { props: { languages: [] } };
  }
};

export default LanguagesPage;
