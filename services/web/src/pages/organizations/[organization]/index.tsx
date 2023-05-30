import { TableContainer, Table, Tbody, Tr, Td, Badge, Divider } from '@chakra-ui/react';
import Container from '@world/components/Container';
import organizations from '@world/data/organizations.json';
import unitedNationMembers from '@world/data/united-nation-members.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Organization = { code: string; name: string };

const OrganizationPage: NextPage = () => {
  const { query } = useRouter();
  const organizationCode: string = query.organization?.toString() ?? '';
  const organization: Organization = organizations.find(
    ({ code = '' }) => code.toLowerCase() === organizationCode.toLowerCase()
  ) ?? { code: '', name: '' };
  const organizationCountries = unitedNationMembers.filter(({ organizations = [] }) =>
    organizations.map(({ code }) => code).includes(organizationCode)
  );
  const regions: string[] = [...new Set(organizationCountries.map(({ region }: { region: string }) => region))].sort(
    (a: string, b: string) => (a > b ? 1 : -1)
  );

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <h1 className="capitalize text-4xl font-bold">{organization.name}</h1>
            <TableContainer className="shadow border rounded">
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Code</Td>
                    <Td isNumeric>{organization.code}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Divider className="border-gray-300" />
            <h2 className="font-semibold text-xl">Countries ({organizationCountries.length})</h2>{' '}
            <TableContainer className="shadow border rounded">
              <Table>
                <Tbody>
                  {regions.map((region: string) => {
                    const organizationCountriesByRegion = organizationCountries.filter(
                      ({ region: countryRegion }) => region === countryRegion
                    );
                    return (
                      <Tr key={region}>
                        <Td>
                          {region} ({organizationCountriesByRegion.length})
                        </Td>
                        <Td isNumeric>
                          <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                            {organizationCountriesByRegion.map(({ cca3, name: { common = '' } }) => {
                              return (
                                <Link key={cca3} href={`/countries/${cca3}`}>
                                  <Badge colorScheme="teal">{common}</Badge>
                                </Link>
                              );
                            })}
                          </div>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default OrganizationPage;
