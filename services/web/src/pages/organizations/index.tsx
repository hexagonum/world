import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { NEXT_PUBLIC_BASE_API } from '@world/configs';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';

type Organization = { code: string; name: string };

type OrganizationsPageProps = { organizations: Organization[] };

const OrganizationsPage: NextPage<OrganizationsPageProps> = ({ organizations = [] }) => {
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

export const getStaticProps = async (): Promise<{ props: { organizations: Organization[] } }> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/organizations`);
    const organizations: Organization[] = await response.json();
    return { props: { organizations } };
  } catch (error) {
    console.error(error);
    return { props: { organizations: [] } };
  }
};

export default OrganizationsPage;
