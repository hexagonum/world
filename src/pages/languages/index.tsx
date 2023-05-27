import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import languages from '@world/data/languages/list.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';

const LanguagesPage: NextPage = () => {
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
                {languages.map(({ code = '', name = '', total = 0, population = 0 }) => {
                  return (
                    <Tr key={code}>
                      <Td>
                        <Link href={`/languages/${code}`}>{name}</Link>
                      </Td>
                      <Td isNumeric>{total}</Td>
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

export default LanguagesPage;
