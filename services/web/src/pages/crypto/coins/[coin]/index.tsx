import { Card, CardBody } from '@chakra-ui/react';
import { NEXT_PUBLIC_BASE_API } from '@world/common/environments';
import { refetch } from '@world/common/libs/refetch';
import { log } from '@world/common/log';
import Container from '@world/components/Container';
import Layout from '@world/layout';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

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

const CoinSection: React.FC<CoinPageProps> = ({ coin }) => {
  if (!coin) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <p className="text-center">No Data</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-2xl md:text-4xl font-bold">
          {coin.name}
        </h1>
        <p className="capitalize text-xl md:text-2xl">#{coin.rank}</p>
      </div>
    </>
  );
};

type CoinPageProps = {
  coin: Coin;
};

const CoinPage: NextPage<CoinPageProps> = ({ coin = {} as Coin }) => {
  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <CoinSection coin={coin} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<CoinPageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const coinId: string = context.query.coin?.toString() ?? '';
    const url = `${NEXT_PUBLIC_BASE_API}/crypto/coins/${coinId}`;
    const coin = await refetch<Coin>(url);
    return { props: { coin } };
  } catch (error) {
    log.error(`getServerSideProps error=${error}`);
    return { props: { coin: {} as Coin } };
  }
};

export default CoinPage;
