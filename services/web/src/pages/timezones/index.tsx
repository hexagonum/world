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
import Container from '@world/components/Container';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';

type Timezone = {
  code: string;
  name: string;
  offset: string;
  utcOffset: string;
};

type TimezonesPageProps = {
  timezones: Timezone[];
};

const TimezonesPage: NextPage<TimezonesPageProps> = ({ timezones = [] }) => {
  return (
    <Layout>
      <Container>
        <div className="p-8">
          <TableContainer className="border rounded shadow">
            <Table>
              <Thead>
                <Tr>
                  <Th>Timezones ({timezones.length})</Th>
                  <Th isNumeric>Offset</Th>
                  <Th isNumeric>UTC Offset</Th>
                </Tr>
              </Thead>
              <Tbody>
                {timezones.map(
                  ({ code = '', name = '', offset = '', utcOffset = '' }) => {
                    return (
                      <Tr key={code}>
                        <Td>{name}</Td>
                        <Td isNumeric>{offset}</Td>
                        <Td isNumeric>
                          <Link href={`/timezones/${utcOffset}`}>
                            {utcOffset}
                          </Link>
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
  props: { timezones: Timezone[] };
}> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/timezones`);
    const timezones: Timezone[] = await response.json();
    return { props: { timezones } };
  } catch (error) {
    log.error(`getStaticProps error=${error}`);
    return { props: { timezones: [] } };
  }
};

export default TimezonesPage;
