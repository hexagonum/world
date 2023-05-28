import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import organizations from '@world/data/organizations.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';

const OrganizationsPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="p-8">
          <TableContainer className="border rounded shadow">
            <Table>
              <Thead>
                <Tr>
                  <Th>Code ({organizations.length})</Th>
                  <Th isNumeric>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {organizations.map(({ code = '', name = '' }) => {
                  return (
                    <Tr key={code}>
                      <Td>
                        <Link href={`/organizations/${code}`}>{code}</Link>
                      </Td>
                      <Td isNumeric>{name}</Td>
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

export default OrganizationsPage;
