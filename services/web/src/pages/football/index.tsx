import {
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { log } from '@world/common/log';
import Container from '@world/components/Container';
import { apolloClient } from '@world/graphql';
import { FOOTBALL_AREAS_QUERY } from '@world/graphql/queries/football';
import Layout from '@world/layout';
import { FootballArea } from '@world/types/football';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const FootballTable: React.FC<{ areas: FootballArea[] }> = ({ areas = [] }) => {
  return (
    <TableContainer className="border rounded shadow">
      <Table>
        <Thead>
          <Tr>
            <Th>Name ({areas.length})</Th>
          </Tr>
        </Thead>
        <Tbody>
          {areas.map(({ id, name }) => {
            return (
              <Tr key={id}>
                <Td>
                  <Link href={`/football/${id}`}>{name}</Link>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <TableCaption>
          <p className="pb-4">Areas ({areas.length})</p>
        </TableCaption>
      </Table>
    </TableContainer>
  );
};

const top: string[] = [
  'england',
  'world',
  'europe',
  'germany',
  'netherlands',
  'brazil',
  'spain',
  'france',
  'portugal',
  'italy',
  'south america',
];

export const FootballPage: NextPage<{ areas: FootballArea[] }> = ({
  areas = [],
}) => {
  const [query, setQuery] = useState<string>('');

  const filteredAreas = areas.filter(({ name }) => {
    const nameFlag =
      query !== '' ? name.toLowerCase().includes(query.toLowerCase()) : true;
    return nameFlag;
  });
  const topAreas = filteredAreas.filter(({ name }) =>
    top.includes(name.toLowerCase())
  );
  const otherAreas = filteredAreas.filter(
    ({ name }) => !top.includes(name.toLowerCase())
  );

  return (
    <Layout
      searchSection={
        <>
          <Input
            id="query"
            name="query"
            placeholder="Query"
            value={query}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setQuery(event.target.value)
            }
            className="shadow"
          />
        </>
      }
    >
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <FootballTable areas={topAreas} />
            <FootballTable areas={otherAreas} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{
  props: { areas: FootballArea[] };
}> => {
  try {
    const data = await apolloClient.query<{
      football: { areas: FootballArea[] };
    }>({ query: FOOTBALL_AREAS_QUERY });
    const areas = [...data.data.football.areas];
    return { props: { areas } };
  } catch (error) {
    log.error(`getStaticProps error=${error}`);
    return { props: { areas: [] } };
  }
};

export default FootballPage;
