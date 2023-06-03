import { Badge, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { apolloClient } from '@world/graphql';
import { COUNTRIES_ORGANIZATIONS_QUERY } from '@world/graphql/queries/countries';
import Layout from '@world/layout';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type Country = { commonName: string; cca3: string; organizations: { code: string; name: string }[] };

type OrganizationsPageProps = {
  countries: Country[];
};

export const OrganizationsPage: NextPage<OrganizationsPageProps> = ({ countries = [] }) => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = countries.filter(({ commonName = '', organizations = [] }) => {
    const organizationCodes: string[] = organizations.map(({ code = '' }: { code: string }) => code);
    const organizationNames: string[] = organizations.map(({ name = '' }: { name: string }) => name);
    const codeFlag: boolean =
      query !== '' ? organizationCodes.some((code: string) => code.toLowerCase().includes(query.toLowerCase())) : true;
    const nameFlag: boolean =
      query !== '' ? organizationNames.some((name: string) => name.toLowerCase().includes(query.toLowerCase())) : true;
    const commonNameFlag: boolean = query !== '' ? commonName.toLowerCase().includes(query.toLowerCase()) : true;
    return codeFlag || nameFlag || commonNameFlag;
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
            <div className="shadow">
              <TableContainer className="border rounded">
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Country ({countriesByFilter.length})</Th>
                      <Th isNumeric>Total</Th>
                      <Th>Organizations</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(({ commonName = '', cca3 = '', organizations = [] }) => {
                      return (
                        <Tr key={cca3}>
                          <Td>
                            <Link href={`/countries/${cca3}`}>{commonName}</Link>
                          </Td>
                          <Td isNumeric>{organizations.length}</Td>
                          <Td>
                            <div className="whitespace-normal">
                              {organizations.length > 0 ? (
                                <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                  {organizations.map(({ code = '', name = '' }) => {
                                    return (
                                      <Link key={code} href={`/organizations/${code}`}>
                                        <Badge colorScheme="teal">{name}</Badge>
                                      </Link>
                                    );
                                  })}
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                  <TableCaption>
                    <p className="pb-4">Organizations ({countriesByFilter.length})</p>
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

export const getStaticProps: GetStaticProps = async (): Promise<{ props: { countries: Country[] } }> => {
  try {
    const data = await apolloClient.query<{ countries: Country[] }>({ query: COUNTRIES_ORGANIZATIONS_QUERY });
    const countries: Country[] = [...data.data.countries];
    countries.sort((a, b) => b.organizations.length - a.organizations.length);
    return { props: { countries } };
  } catch (error) {
    console.error(error);
    return { props: { countries: [] } };
  }
};

export default OrganizationsPage;
