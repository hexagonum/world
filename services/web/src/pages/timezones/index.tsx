import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import timezones from '@world/data/timezones/list.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';

const TimezonesPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="p-8">
          <TableContainer className="border rounded shadow">
            <Table>
              <Thead>
                <Tr>
                  <Th>Timezones ({timezones.length})</Th>
                  <Th isNumeric>Offset</Th>
                  <Th isNumeric>Countries</Th>
                </Tr>
              </Thead>
              <Tbody>
                {timezones.map(({ name = '', offset = 0, total = 0 }) => {
                  return (
                    <Tr key={name}>
                      <Td>
                        <Link href={`/timezones/${name}`}>{name}</Link>
                      </Td>
                      <Td isNumeric>{offset}</Td>
                      <Td isNumeric>{total}</Td>
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

export default TimezonesPage;
