import { Card, CardBody } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { NEXT_PUBLIC_BASE_API } from '@world/configs';
import useFetch from '@world/hooks/use-fetch';
import Layout from '@world/layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

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

const CoinSection: React.FC = () => {
  const { query } = useRouter();
  const coinId: string = query.coin?.toString() ?? '';
  const { loading, error, data } = useFetch<Coin>(
    `${NEXT_PUBLIC_BASE_API}/crypto/coins/${coinId}`
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
          <p className="text-center">Error</p>
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

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-2xl md:text-4xl font-bold">
          {data.name}
        </h1>
        <p className="capitalize text-xl md:text-2xl">#{data.rank}</p>
      </div>
    </>
  );
};

const CoinPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <CoinSection />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CoinPage;
