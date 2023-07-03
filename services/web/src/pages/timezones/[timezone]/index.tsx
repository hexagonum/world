import { useQuery } from '@apollo/client';
import {
  Badge,
  Card,
  CardBody,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import { Container } from '@world/components/Container';
import { COUNTRIES_TIMEZONES_QUERY } from '@world/graphql/queries/countries';
import Layout from '@world/layout';
import { Country } from '@world/types';
import { unique } from '@world/common/utils/unique';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Timezone = { code: string; name: string; utcOffset: string };

const TimezoneMain: React.FC<{ timezoneUtcOffset: string }> = ({
  timezoneUtcOffset = '',
}) => {
  const { loading, error, data } = useQuery<{
    countries: Country[];
    timezones: Timezone[];
  }>(COUNTRIES_TIMEZONES_QUERY, { variables: { timezone: timezoneUtcOffset } });

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

  const timezones: Timezone[] = data.timezones.filter(
    ({ utcOffset }) => utcOffset === timezoneUtcOffset
  );
  const regions: string[] = unique(
    data.countries.map(({ region }: Country) => region)
  ).sort((a: string, b: string) => (a > b ? 1 : -1));

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <h1 className="capitalize text-4xl font-bold">{timezoneUtcOffset}</h1>
      <TableContainer className="shadow border rounded">
        <Table>
          <Tbody>
            <Tr>
              <Td>Offset</Td>
              <Td isNumeric>{timezoneUtcOffset}</Td>
            </Tr>
            <Tr>
              <Td>Timezones ({timezones.length})</Td>
              <Td>
                <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                  {timezones.map((timezone: Timezone) => (
                    <Badge key={timezone.code}>{timezone.name}</Badge>
                  ))}
                </div>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Divider className="border-gray-300" />
      <h2 className="font-semibold text-xl">
        Countries ({data.countries.length})
      </h2>{' '}
      <TableContainer className="shadow border rounded">
        <Table>
          <Tbody>
            {regions.map((region: string) => {
              const countriesByRegion = data.countries.filter(
                ({ region: countryRegion }) => region === countryRegion
              );
              return (
                <Tr key={region}>
                  <Td>
                    {region} ({countriesByRegion.length})
                  </Td>
                  <Td isNumeric>
                    <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                      {countriesByRegion.map(({ code, commonName }) => {
                        return (
                          <Link key={code} href={`/countries/${code}`}>
                            <Badge colorScheme="teal">{commonName}</Badge>
                          </Link>
                        );
                      })}
                    </div>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

const TimezonePage: NextPage = () => {
  const { query } = useRouter();
  const timezoneUtcOffset: string = query.timezone?.toString() ?? '';

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <TimezoneMain timezoneUtcOffset={timezoneUtcOffset} />
        </div>
      </Container>
    </Layout>
  );
};

export default TimezonePage;
