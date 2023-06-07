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
import { FOOTBALL_TEAMS_QUERY } from '@world/graphql/queries/football';
import Layout from '@world/layout';
import { Football, FootballStanding } from '@world/types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const StandingsMain: React.FC<{ areaId: string; competitionId: string }> = ({ areaId, competitionId }) => {
  const { loading, error, data } = useQuery<{ football: Football }>(FOOTBALL_TEAMS_QUERY, {
    variables: { filterOptions: { areaId: parseInt(areaId, 10), competitionId: parseInt(competitionId, 10) } },
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
  const competition = data.football.areas[0].competitions[0] ?? {};
  const standings: FootballStanding[] = data.football.areas[0].competitions[0].standings ?? [];

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/football">Football</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/football/${area.id}`}>{area.name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/football/${area.id}/${competition.id}`}>{competition.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <TableContainer className="border rounded shadow">
        <Table>
          <Thead>
            <Tr>
              <Th>Pos.</Th>
              <Th>Name</Th>
              <Th isNumeric>Won</Th>
              <Th isNumeric>Draw</Th>
              <Th isNumeric>Lost</Th>
              <Th isNumeric>Points</Th>
              <Th isNumeric>Goals</Th>
              <Th isNumeric>Goals Against</Th>
              <Th isNumeric>Goals Difference</Th>
            </Tr>
          </Thead>
          <Tbody>
            {standings.map(
              ({ position, id, name, won, draw, lost, points, goalsFor, goalsAgainst, goalDifference }) => {
                return (
                  <Tr key={id}>
                    <Td>{position}</Td>
                    <Td>
                      <Link href={`/football/${areaId}/${competitionId}/${id}`}>{name}</Link>
                    </Td>
                    <Td isNumeric>{won}</Td>
                    <Td isNumeric>{draw}</Td>
                    <Td isNumeric>{lost}</Td>
                    <Td isNumeric>{points}</Td>
                    <Td isNumeric>{goalsFor}</Td>
                    <Td isNumeric>{goalsAgainst}</Td>
                    <Td isNumeric>{goalDifference}</Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
          <TableCaption>
            <p className="pb-4">Teams ({standings.length})</p>
          </TableCaption>
        </Table>
      </TableContainer>
    </div>
  );
};

const StandingsPage: NextPage = () => {
  const { query } = useRouter();
  const areaId: string = query.areaId?.toString() ?? '';
  const competitionId: string = query.competitionId?.toString() ?? '';

  return (
    <Layout>
      <Container>
        <div className="p-8">
          {areaId && competitionId ? <StandingsMain areaId={areaId} competitionId={competitionId} /> : <></>}
        </div>
      </Container>
    </Layout>
  );
};

export default StandingsPage;
