import { Badge, Divider, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { Container } from '@world/components/Container';
import isoAlpha3Codes from '@world/data/codes/iso-alpha-3.json';
import currencies from '@world/data/currencies/list.json';
import unitedNationMembers from '@world/data/united-nation-members.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Currency = { code: string; name: string; symbol: string; total: number; countries: string[] };
const defaultCurrency: Currency = {
  code: '',
  name: '',
  symbol: '',
  total: 0,
  countries: [],
};

const CurrencyPage: NextPage = () => {
  const { query } = useRouter();
  const currencyCode: string = query.currency?.toString() ?? '';
  const currency: Currency =
    currencies.find(({ code }) => code.toLowerCase() === currencyCode.toLowerCase()) ?? defaultCurrency;

  const currencyCountries = unitedNationMembers.filter(({ cca3 }) => {
    return currency.countries.includes(cca3);
  });
  const regions: string[] = [...new Set(currencyCountries.map(({ region }: { region: string }) => region))].sort(
    (a: string, b: string) => (a > b ? 1 : -1)
  );

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <h1 className="capitalize text-4xl font-bold">{currency.name}</h1>
            <TableContainer className="shadow border rounded">
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Symbol</Td>
                    <Td isNumeric>{currency.symbol}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Divider className="border-gray-300" />
            <h2 className="font-semibold text-xl">Countries ({currency.countries.length})</h2>{' '}
            <TableContainer className="shadow border rounded">
              <Table>
                <Tbody>
                  {regions.map((region: string) => {
                    const currencyCountriesByRegion = currencyCountries.filter(
                      ({ region: countryRegion }) => region === countryRegion
                    );
                    return (
                      <Tr key={region}>
                        <Td>
                          {region} ({currencyCountriesByRegion.length})
                        </Td>
                        <Td isNumeric>
                          <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                            {currencyCountriesByRegion.map(({ cca3 }) => {
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

export default CurrencyPage;
