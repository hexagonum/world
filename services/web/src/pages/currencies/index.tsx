import { Card, CardBody, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { NEXT_PUBLIC_BASE_API } from '@world/configs';
import useFetch from '@world/hooks/use-fetch';
import Layout from '@world/layout';
import { currencyFormatter } from '@world/utils/currency-formatter';
import { NextPage } from 'next';
import Link from 'next/link';

type Country = {
  commonName: string;
  region: string;
  subregion: string;
  population: number;
};

type Currency = { code: string; name: string; countries: { country: Country }[] };

type CurrenciesPageProps = { currencies: Currency[] };

type CurrenciesListProps = {
  currencies: Currency[];
  loading?: boolean;
  error?: Error;
  data?: RatesResponse;
};

const CurrenciesList: React.FC<CurrenciesListProps> = ({
  currencies = [],
  loading = false,
  error = null,
  data = null,
}) => {
  if (loading) {
    return (
      <Card className="border border-gray-200">
        <CardBody>Loading</CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border border-gray-200">
        <CardBody>{error.message}</CardBody>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="border border-gray-200">
        <CardBody>No Data</CardBody>
      </Card>
    );
  }

  const { rates = {}, base = '' } = data;

  return (
    <TableContainer className="border rounded shadow">
      <Table>
        <Thead>
          <Tr>
            <Th>Currencies ({currencies.length})</Th>
            <Th isNumeric>Countries</Th>
            <Th isNumeric>Rate</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currencies.map(({ code = '', name = '', countries = [] }) => {
            let rate: string = 'N/A';
            if (base === code) {
              rate = '1';
            } else if (rates[code]) {
              rate = currencyFormatter(rates[code], code);
            }
            return (
              <Tr key={code}>
                <Td>
                  <Link href={`/currencies/${code}`}>{name}</Link>
                </Td>
                <Td isNumeric>{countries.length}</Td>
                <Td isNumeric>{rate}</Td>
              </Tr>
            );
          })}
        </Tbody>
        <TableCaption>
          <p className="pb-4">Currencies ({currencies.length})</p>
        </TableCaption>
      </Table>
    </TableContainer>
  );
};

type RatesResponse = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};

const CurrenciesPage: NextPage<CurrenciesPageProps> = ({ currencies = [] }) => {
  const base: string = 'https://api.frankfurter.app';
  const url: string = `${base}/latest?base=EUR&amount=${1}`;
  const { data, loading, error } = useFetch<RatesResponse>(url);

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <CurrenciesList currencies={currencies} loading={loading} error={error} data={data} />
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{ props: { currencies: Currency[] } }> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/currencies`);
    const currencies: Currency[] = await response.json();
    return { props: { currencies } };
  } catch (error) {
    console.error(error);
    return { props: { currencies: [] } };
  }
};

export default CurrenciesPage;
