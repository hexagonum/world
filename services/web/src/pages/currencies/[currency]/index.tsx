import { useQuery } from '@apollo/client';
import {
  Badge,
  Card,
  CardBody,
  Divider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import { Container } from '@world/components/Container';
import { CURRENCY_QUERY } from '@world/graphql/queries/currencies';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Currency = {
  code: string;
  name: string;
  symbol: string;
  countries: {
    commonName: string;
    cca2: string;
    cca3: string;
    region: string;
    subregion: string;
    population: number;
  }[];
};

const CurrencyData: React.FC<{ code: string }> = ({ code }) => {
  const { loading, error, data } = useQuery<{ currency: Currency }>(
    CURRENCY_QUERY,
    {
      variables: { code },
    }
  );

  if (loading) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <p className="text-center">Loading</p>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <p className="text-center">{error.message}</p>
        </CardBody>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <p className="text-center">No Data</p>
        </CardBody>
      </Card>
    );
  }

  const currency = data.currency;
  const regions: string[] = [
    ...new Set(
      currency.countries.map(({ region }: { region: string }) => region)
    ),
  ].sort((a: string, b: string) => (a > b ? 1 : -1));

  return (
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
      <h2 className="font-semibold text-xl">
        Countries ({currency.countries.length})
      </h2>
      <TableContainer className="shadow border rounded">
        <Table>
          <Tbody>
            {regions.map((region: string) => {
              const currencyCountriesByRegion = currency.countries.filter(
                ({ region: countryRegion }) => region === countryRegion
              );
              return (
                <Tr key={region}>
                  <Td>
                    {region} ({currencyCountriesByRegion.length})
                  </Td>
                  <Td isNumeric>
                    <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                      {currencyCountriesByRegion.map(
                        ({ cca3 = '', commonName = '' }) => {
                          return (
                            <Link key={cca3} href={`/countries/${cca3}`}>
                              <Badge colorScheme="teal">{commonName}</Badge>
                            </Link>
                          );
                        }
                      )}
                    </div>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <TableCaption>
            <p className="pb-4 text-center">
              Countries ({currency.countries.length})
            </p>
          </TableCaption>
        </Table>
      </TableContainer>
    </div>
  );
};

const CurrencyPage: NextPage = () => {
  const { query } = useRouter();
  const currencyCode: string = query.currency?.toString() ?? '';
  console.log(currencyCode);
  return (
    <Layout>
      <Container>
        <div className="p-8">
          <CurrencyData code={currencyCode} />
        </div>
      </Container>
    </Layout>
  );
};

export default CurrencyPage;
