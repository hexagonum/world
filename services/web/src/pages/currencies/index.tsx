import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import currencies from '@world/data/currencies/list.json';
import useFetch from '@world/hooks/use-fetch';
import Layout from '@world/layout';
import { currencyFormatter } from '@world/utils/currency-formatter';
import { NextPage } from 'next';
import Link from 'next/link';

type CurrenciesListProps = {
  loading?: boolean;
  error?: Error;
  data?: RatesResponse;
};

const CurrenciesList: React.FC<CurrenciesListProps> = ({ loading, error, data }) => {
  if (loading) {
    return <div className="flex justify-center items-center py-8">Loading</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center py-8">{error.message}</div>;
  }

  if (!data) {
    return <div className="flex justify-center items-center py-8">No Data</div>;
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
          {currencies.map(({ code = '', name = '', total = 0 }) => {
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
                <Td isNumeric>{total}</Td>
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

const CurrenciesPage: NextPage = () => {
  const base: string = 'https://api.frankfurter.app';
  const url: string = `${base}/latest?base=EUR&amount=${1}`;
  const { data, loading, error } = useFetch<RatesResponse>(url);

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <CurrenciesList loading={loading} error={error} data={data} />
        </div>
      </Container>
    </Layout>
  );
};

export default CurrenciesPage;
