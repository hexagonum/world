import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { NEXT_PUBLIC_BASE_API } from '@world/common/environments';
import { log } from '@world/common/log';
import currencyFormatter from '@world/common/utils/currency-formatter';
import Container from '@world/components/Container';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type Coin = {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  tier: number;
  change: string;
  rank: number;
  sparkline: string[];
  lowVolume: boolean;
  coinrankingUrl: string;
  '24hVolume': string;
  btcPrice: string;
};

type CoinsPageProps = {
  coins: Coin[];
};

const CoinsPage: NextPage<CoinsPageProps> = ({ coins = [] }) => {
  return (
    <Layout>
      <Container>
        <div className="p-8">
          <TableContainer className="border rounded shadow">
            <Table>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Coins ({coins.length})</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Change</Th>
                </Tr>
              </Thead>
              <Tbody>
                {coins.map(
                  ({
                    uuid = '',
                    iconUrl = '',
                    symbol = '',
                    name = '',
                    price = '',
                    change = '',
                  }) => {
                    const changeNumber: number = parseFloat(change || '0');
                    return (
                      <Tr key={uuid}>
                        <Td>
                          <div className="w-8">
                            <Image
                              src={iconUrl || ''}
                              alt={symbol}
                              width={32}
                              height={32}
                              className="w-8"
                            />
                          </div>
                        </Td>
                        <Td>
                          <Link href={`/crypto/coins/${uuid}`}>
                            {symbol} - {name}
                          </Link>
                        </Td>
                        <Td isNumeric>
                          {currencyFormatter(parseFloat(price || '0'), 'USD')}
                        </Td>
                        <Td isNumeric>
                          <p
                            className={
                              changeNumber >= 0
                                ? 'text-green-500'
                                : 'text-red-500'
                            }
                          >
                            {changeNumber}%
                          </p>
                        </Td>
                      </Tr>
                    );
                  }
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{
  props: { coins: Coin[] };
}> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/crypto/coins`);
    const coins: Coin[] = await response.json();
    return { props: { coins } };
  } catch (error) {
    log.error(`getStaticProps error=${error}`);
    return { props: { coins: [] } };
  }
};

export default CoinsPage;
