import {
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
import { NEXT_PUBLIC_BASE_API } from '@world/common/environments';
import { refetch } from '@world/common/libs/refetch';
import { log } from '@world/common/log';
import { currencyFormatter } from '@world/common/utils/currency-formatter';
import Container from '@world/components/Container';
import Layout from '@world/layout';
import { Country } from '@world/types';
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

const CurrenciesRates: React.FC<CurrenciesPageProps> = ({
  base = '',
  currencies = [],
  rates = {},
}) => {
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

type CurrenciesPageProps = {
  base: string;
  currencies: Currency[];
  rates: Record<string, number>;
};

const CurrenciesPage: NextPage<CurrenciesPageProps> = ({
  base = '',
  currencies = [],
  rates = {},
}) => {
  return (
    <Layout>
      <Container>
        <div className="p-8">
          <CurrenciesRates base={base} currencies={currencies} rates={rates} />
        </div>
      </Container>
    </Layout>
  );
};

const getRates = async (): Promise<{
  base: string;
  rates: Record<string, number>;
}> => {
  try {
    const baseUrl: string = 'https://api.frankfurter.app';
    const url: string = `${baseUrl}/latest?base=EUR&amount=${1}`;
    const { base = '', rates = {} } = await refetch<{
      base: string;
      rates: Record<string, number>;
    }>(url);
    return { base, rates };
  } catch (error) {
    log.error(`getRates error=${error}`);
    return { base: '', rates: {} };
  }
};

export const getStaticProps = async (): Promise<{
  props: {
    base: string;
    currencies: Currency[];
    rates: Record<string, number>;
  };
}> => {
  try {
    const currencies: Currency[] = await refetch<Currency[]>(
      `${NEXT_PUBLIC_BASE_API}/currencies`
    );
    const { base = '', rates = {} } = await getRates();
    return { props: { base, currencies, rates } };
  } catch (error) {
    log.error(`getStaticProps error=${error}`);
    return { props: { base: '', currencies: [], rates: {} } };
  }
};

export default CurrenciesPage;
