import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Container from '@world/components/Container';
import { Weather } from '@world/components/Weather';
import { apolloClient } from '@world/graphql';
import { HOME_QUERY } from '@world/graphql/queries/home';
import { Layout } from '@world/layout';
import { City, Passport } from '@world/types';
import { ForexHistory, ForexRate } from '@world/types/currency';
import { GoogleRank } from '@world/types/google';
import { Article } from '@world/types/news';
import { YouTubeVideo } from '@world/types/youtube';
import currencyFormatter from '@world/utils/currency-formatter';
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import Link from 'next/link';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const GoogleRanksSection: React.FC<{ googleRanks: GoogleRank[] }> = ({ googleRanks = [] }) => {
  return (
    <>
      {googleRanks.length > 0 ? (
        <TableContainer className="border rounded shadow">
          <Table>
            <Thead>
              <Tr>
                <Th>Google Trends ({googleRanks.length})</Th>
                <Th isNumeric>Occurrences</Th>
              </Tr>
            </Thead>
            <Tbody>
              {googleRanks.map(({ rank, query, count }) => {
                return (
                  <Tr key={rank}>
                    <Td>
                      <Link href={`https://google.com/search?q=${encodeURIComponent(query)}`} target="_blank">
                        <Badge colorScheme="teal">{query}</Badge>
                      </Link>
                    </Td>
                    <Td isNumeric>
                      <b>{count}</b>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <TableCaption>
              <Link href="/trends" className="uppercase">
                <Button colorScheme="teal" className="w-full mb-4">
                  View Full Table
                </Button>
              </Link>
            </TableCaption>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
};

const NewsSection: React.FC<{ articles: Article[] }> = ({ articles = [] }) => {
  return (
    <>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {articles.map(
            ({
              title = '',
              author = '',
              url = '',
              urlToImage = '',
              source: { name: sourceName = '' } = { name: '' },
            }) => {
              return (
                <div key={title} className="col-span-1">
                  <Link href={url || '#'} target="_blank">
                    <Card className="border border-gray-200 overflow-hidden shadow">
                      <div
                        className="aspect-video bg-cover bg-center bg-teal-500"
                        style={{ backgroundImage: `url(${urlToImage || ''})` }}
                      />
                      <CardBody>
                        <div className="flex flex-col gap-2 md:gap-4">
                          <h2 className="font-bold line-clamp-2" title={title}>
                            {title}
                          </h2>
                          <p>{sourceName || author || ''}</p>
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
              );
            }
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const ForexRates: React.FC<{ forexRates: ForexRate[] }> = ({ forexRates = [] }) => {
  return (
    <>
      {forexRates.length > 0 ? (
        <TableContainer className="border rounded shadow">
          <Table>
            <Thead>
              <Tr>
                <Th>USD</Th>
                <Th isNumeric>1000</Th>
              </Tr>
            </Thead>
            <Tbody>
              {forexRates.map(({ code, rate }) => {
                return (
                  <Tr key={code}>
                    <Td>
                      <Link href={`/currencies/${code}`}>
                        <Badge colorScheme="teal">{code}</Badge>
                      </Link>
                    </Td>
                    <Td isNumeric>{currencyFormatter(rate, code)}</Td>
                  </Tr>
                );
              })}
            </Tbody>
            <TableCaption>
              <Link href="/currencies" className="uppercase">
                <Button colorScheme="teal" className="w-full mb-4">
                  View Full Table
                </Button>
              </Link>
            </TableCaption>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
};

const ForexChart: React.FC<{ forexHistory: ForexHistory[] }> = ({ forexHistory = [] }) => {
  const tos: number[] = forexHistory.map(({ to }) => to);
  const min: number = Math.min(...tos);
  const max: number = Math.max(...tos);
  console.log(min, max);
  return (
    <>
      {forexHistory.length > 0 ? (
        <Card className="border border-gray-200 shadow">
          <CardHeader>
            <Text className="text-center font-bold">USD to EUR</Text>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="h-[300px] md:h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={1600} height={900} data={forexHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0.9, 0.95]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="to" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

const YouTubeVideos: React.FC<{ videos: YouTubeVideo[] }> = ({ videos = [] }) => {
  return (
    <>
      {videos.map(({ id, title, channelTitle, thumbnails }) => {
        const url: string =
          thumbnails?.maxres?.url ||
          thumbnails?.standard?.url ||
          thumbnails?.high?.url ||
          thumbnails?.medium?.url ||
          thumbnails?.default?.url;
        return (
          <div key={id} className="col-span-1">
            <Link href={`https://youtu.be/${id}`} target="_blank">
              <Card className="border border-gray-200 shadow">
                <div
                  className="aspect-video bg-cover bg-center bg-teal-500"
                  style={{ backgroundImage: `url(${url || ''})` }}
                />
                <CardBody>
                  <h2 className="font-bold line-clamp-2" title={title}>
                    {title}
                  </h2>
                  <p>{channelTitle || ''}</p>
                </CardBody>
              </Card>
            </Link>
          </div>
        );
      })}
    </>
  );
};

const PassportsSection: React.FC<{ passports: Passport[] }> = ({ passports = [] }) => {
  return (
    <>
      {passports.length > 0 ? (
        <TableContainer className="border rounded shadow">
          <Table>
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th isNumeric>Country</Th>
              </Tr>
            </Thead>
            <Tbody>
              {passports.map(({ countryCode, individualRank, country: { commonName } }) => {
                return (
                  <Tr key={countryCode}>
                    <Td>{individualRank}</Td>
                    <Td isNumeric>
                      <Link href={`/countries/${countryCode}`}>
                        <Badge colorScheme="teal">{commonName}</Badge>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <TableCaption>
              <Link href="/passports" className="uppercase">
                <Button colorScheme="teal" className="w-full mb-4">
                  View Full Table
                </Button>
              </Link>
            </TableCaption>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
};

type CountriesPageProps = {
  cities: City[];
  passports: Passport[];
  googleRanks: GoogleRank[];
  forexRates: ForexRate[];
  forexHistory: ForexHistory[];
  articles: Article[];
  videos: YouTubeVideo[];
};

export const CountriesPage: NextPage<CountriesPageProps> = ({
  cities = [],
  googleRanks = [],
  forexRates = [],
  forexHistory = [],
  passports = [],
  articles = [],
  videos = [],
}) => {
  return (
    <Layout>
      <Container>
        <div className="p-4 md:p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <section className="flex flex-col gap-2 md:gap-4">
              <h1 className="text-2xl uppercase">Weather</h1>
              <Divider />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {cities.map(({ id, city, latitude, longitude, timezone }: City) => (
                  <div key={id} className="col-span-1">
                    <Weather city={city} latitude={latitude} longitude={longitude} timezone={timezone} />
                  </div>
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-2 md:gap-4">
              <h1 className="text-2xl uppercase">Forex</h1>
              <Divider />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="col-span-1 order-2 md:order-1">
                  <ForexRates forexRates={forexRates} />
                </div>
                <div className="col-span-2 order-1 md:order-2">
                  <ForexChart forexHistory={forexHistory} />
                </div>
              </div>
            </section>
            <section className="flex flex-col gap-2 md:gap-4">
              <h1 className="text-2xl uppercase">News</h1>
              <Divider />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="col-span-1">
                  <GoogleRanksSection googleRanks={googleRanks} />
                </div>
                <div className="col-span-2">
                  <NewsSection articles={articles} />
                </div>
              </div>
            </section>
            <section className="flex flex-col gap-2 md:gap-4">
              <h1 className="text-2xl uppercase">YouTube</h1>
              <Divider />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <YouTubeVideos videos={videos} />
              </div>
            </section>
            <section className="flex flex-col gap-2 md:gap-4">
              <h1 className="text-2xl uppercase">Passports</h1>
              <Divider />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="col-span-1">
                  <PassportsSection passports={passports} />
                </div>
                <div className="col-span-2"></div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (
  _context: GetStaticPropsContext
): Promise<{
  props: {
    cities: City[];
    googleRanks: GoogleRank[];
    passports: Passport[];
    articles: Article[];
    forexRates: ForexRate[];
    forexHistory: ForexHistory[];
    videos: YouTubeVideo[];
  };
}> => {
  try {
    const data = await apolloClient.query<{
      cities: City[];
      rates: ForexRate[];
      passports: Passport[];
      history: ForexHistory[];
      google: { ranks: GoogleRank[] };
      news: { headlines: Article[] };
      youtube: { videos: YouTubeVideo[] };
    }>({
      query: HOME_QUERY,
      variables: {
        days: 30,
        from: 'USD',
        to: 'EUR',
        amount: 1000,
        base: 'USD',
        limit: 10,
        pageSize: 4,
        country: 'us',
        maxResults: 6,
      },
    });
    const cities = [...data.data.cities]
      .filter(({ city }) => ['Hà Nội', 'Melbourne', 'Dallas'].includes(city))
      .sort((a, b) => (a.timezone > b.timezone ? 1 : -1));
    const forexRates = [...data.data.rates].splice(0, 10);
    const forexHistory = [...data.data.history];
    const googleRanks = [...data.data.google.ranks];
    const passports = [...data.data.passports];
    const articles = [...data.data.news.headlines];
    const videos = [...data.data.youtube.videos];
    const props = { cities, googleRanks, forexRates, passports, articles, forexHistory, videos };
    console.log('props', props);
    return { props };
  } catch (error) {
    console.error(error);
    return {
      props: { cities: [], googleRanks: [], forexRates: [], passports: [], articles: [], forexHistory: [], videos: [] },
    };
  }
};

export default CountriesPage;
