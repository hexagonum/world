import { Badge, Divider, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { Container } from '@world/components/Container';
import isoAlpha3Codes from '@world/data/codes/iso-alpha-3.json';
import languages from '@world/data/languages/list.json';
import unitedNationMembers from '@world/data/united-nation-members.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Language = { code: string; name: string; total: number; population: number; countries: string[] };
const defaultLanguage = {
  code: '',
  name: '',
  total: 0,
  population: 0,
  countries: [],
};

const LanguagePage: NextPage = () => {
  const { query } = useRouter();
  const languageCode: string = query.language?.toString() ?? '';
  const language: Language =
    languages.find(({ code }) => code.toLowerCase() === languageCode.toLowerCase()) ?? defaultLanguage;

  const languageCountries = unitedNationMembers.filter(({ cca3 }) => {
    return language.countries.includes(cca3);
  });
  const regions: string[] = [...new Set(languageCountries.map(({ region }: { region: string }) => region))].sort(
    (a: string, b: string) => (a > b ? 1 : -1)
  );

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <h1 className="capitalize text-4xl font-bold">{language.name}</h1>
            <TableContainer className="shadow border rounded">
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Population</Td>
                    <Td isNumeric>{language.population.toLocaleString()}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Divider className="border-gray-300" />
            <h2 className="font-semibold text-xl">Countries ({language.countries.length})</h2>{' '}
            <TableContainer className="shadow border rounded">
              <Table>
                <Tbody>
                  {regions.map((region: string) => {
                    const languageCountriesByRegion = languageCountries.filter(
                      ({ region: countryRegion }) => region === countryRegion
                    );
                    return (
                      <Tr key={region}>
                        <Td>
                          {region} ({languageCountriesByRegion.length})
                        </Td>
                        <Td isNumeric>
                          <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                            {languageCountriesByRegion.map(({ cca3 }) => {
                              return (
                                <Link key={cca3} href={`/countries/${cca3}`}>
                                  <Badge colorScheme="teal">
                                    {(isoAlpha3Codes as Record<string, string>)[cca3] || ''}
                                  </Badge>
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

export default LanguagePage;
