import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { apolloClient } from '@world/graphql';
import { ORGANIZATIONS_QUERY } from '@world/graphql/queries/organizations';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';

type Organization = { code: string; name: string; countries: { cca2: string; cca3: string; commonName: string }[] };

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
                  <Th isNumeric>Countries</Th>
                </Tr>
              </Thead>
              <Tbody>
                {organizations.map(({ code = '', name = '', countries = [] }) => {
                  return (
                    <Tr key={code}>
                      <Td>
                        <Link href={`/organizations/${code}`}>{code}</Link>
                      </Td>
                      <Td isNumeric>{name}</Td>
                      <Td isNumeric>{countries.length}</Td>
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
    const data = await apolloClient.query<{ organizations: Organization[] }>({ query: ORGANIZATIONS_QUERY });
    const organizations = data.data.organizations;
    return { props: { organizations } };
  } catch (error) {
    console.error(error);
    return { props: { organizations: [] } };
  }
};

export default OrganizationsPage;
