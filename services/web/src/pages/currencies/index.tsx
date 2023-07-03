import {
  Card,
  CardBody,
  Divider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Container from '@world/components/Container';
import { NEXT_PUBLIC_BASE_API } from '@world/common/environments';
import useFetch from '@world/common/hooks/use-fetch';
import Layout from '@world/layout';
import { Country } from '@world/types';
import { currencyFormatter } from '@world/common/utils/currency-formatter';
import { NextPage } from 'next';
import Link from 'next/link';

type Currency = {
  code: string;
  name: string;
  countries: { country: Country }[];
};

const CurrenciesTable: React.FC<{
  currencies: (Currency & { rate: string })[];
}> = ({ currencies = [] }) => {
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
          {currencies.map(
            ({ code = '', name = '', countries = [], rate = '' }) => {
              return (
                <Tr key={code}>
                  <Td>
                    <Link href={`/currencies/${code}`}>{name}</Link>
                  </Td>
                  <Td isNumeric>{countries.length}</Td>
                  <Td isNumeric>{rate}</Td>
                </Tr>
              );
            }
          )}
        </Tbody>
        <TableCaption>
          <p className="pb-4">Currencies ({currencies.length})</p>
        </TableCaption>
      </Table>
    </TableContainer>
  );
};

type CurrenciesRatesProps = {
  currencies: Currency[];
  loading?: boolean;
  error?: Error;
  data?: RatesResponse;
};

const CurrenciesRates: React.FC<CurrenciesRatesProps> = ({
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
  const currenciesRates = currencies.map(
    ({ code = '', name = '', countries = [] }) => {
      let rate: string = 'N/A';
      if (base === code) {
        rate = '1';
      } else if (rates[code]) {
        rate = currencyFormatter(rates[code], code);
      }
      return { code, name, countries, rate };
    }
  );
  const currenciesWithRates = currenciesRates.filter(
    ({ rate }) => rate !== 'N/A'
  );
  const currenciesWithoutRates = currenciesRates.filter(
    ({ rate }) => rate === 'N/A'
  );

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-xl">Rates ({currenciesWithRates.length})</h2>
        <CurrenciesTable currencies={currenciesWithRates} />
      </section>
      <Divider />
      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-xl">Other ({currenciesWithoutRates.length})</h2>
        <CurrenciesTable currencies={currenciesWithoutRates} />
      </section>
    </div>
  );
};

type CurrenciesPageProps = { currencies: Currency[] };

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
          <CurrenciesRates
            currencies={currencies}
            loading={loading}
            error={error}
            data={data}
          />
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{
  props: { currencies: Currency[] };
}> => {
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
