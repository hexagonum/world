import { useQuery } from '@apollo/client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Container } from '@world/components/Container';
import { FOOTBALL_COMPETITIONS_QUERY } from '@world/graphql/queries/football';
import Layout from '@world/layout';
import area from '@world/pages/countries/area';
import { Football, FootballCompetition } from '@world/types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const CompetitionMain: React.FC<{ areaId: string }> = ({ areaId }) => {
  const { loading, error, data } = useQuery<{ football: Football }>(FOOTBALL_COMPETITIONS_QUERY, {
    variables: { filterOptions: { areaId: parseInt(areaId, 10) } },
  });

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
          <p className="text-center">{error.message}</p>
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

  const area = data.football.areas[0] ?? {};
  const competitions: FootballCompetition[] = data.football.areas[0].competitions ?? [];

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/football">Football</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/football/${area.id}`}>{area.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <TableContainer className="border rounded shadow">
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th isNumeric>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {competitions.map(({ id, name }) => {
              return (
                <Tr key={id}>
                  <Td>
                    <Link href={`/football/${areaId}/${id}`}>{id}</Link>
                  </Td>
                  <Td isNumeric>{name}</Td>
                </Tr>
              );
            })}
          </Tbody>
          <TableCaption>
            <p className="pb-4">Competitions ({competitions.length})</p>
          </TableCaption>
        </Table>
      </TableContainer>
    </div>
  );
};

const CompetitionPage: NextPage = () => {
  const { query } = useRouter();
  const areaId: string = query.areaId?.toString() ?? '';

  return (
    <Layout>
      <Container>
        <div className="p-8">{areaId ? <CompetitionMain areaId={areaId} /> : <></>}</div>
      </Container>
    </Layout>
  );
};

export default CompetitionPage;
