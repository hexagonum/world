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
import { FOOTBALL_MATCHES_QUERY } from '@world/graphql/queries/football';
import Layout from '@world/layout';
import { Football, FootballMatch } from '@world/types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const MatchesMain: React.FC<{ areaId: string; competitionId: string; teamId: string }> = ({
  areaId,
  competitionId,
  teamId,
}) => {
  const { loading, error, data } = useQuery<{ football: Football }>(FOOTBALL_MATCHES_QUERY, {
    variables: {
      filterOptions: {
        areaId: parseInt(areaId, 10),
        competitionId: parseInt(competitionId, 10),
        teamId: parseInt(teamId, 10),
      },
    },
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
  const team = data.football.areas[0].competitions[0].standings[0] ?? {};
  const matches: FootballMatch[] = data.football.areas[0].competitions[0].standings[0].matches ?? [];

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/football">Football</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/football/${area.id}`}>{area.name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/football/${area.id}/${competition.id}`}>{competition.name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/football/${area.id}/${competition.id}.${team.id}`}>{team.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="flex flex-col gap-4 md:gap-8">
        {matches.map(({ homeTeam, awayTeam, score, utcDate }) => {
          const utcOffset: number = new Date().getTimezoneOffset() / -60;
          const d: Date = new Date(utcDate);
          d.setUTCMilliseconds(1000 * 60 * 60 * utcOffset);

          return (
            <Card key={`${homeTeam.id}-${awayTeam.id}`} className="border border-gray-200">
              <CardBody>
                <div className="flex flex-col gap-2 md:gap-4">
                  <div className="flex justify-between items-center">
                    <p>
                      <b>{competition.name}</b>
                    </p>
                    <p>
                      {d.toLocaleDateString()} {d.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>{homeTeam.name}</p>
                    <p>{score.fullTime.home}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>{awayTeam.name}</p>
                    <p>{score.fullTime.away}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const MatchesPage: NextPage = () => {
  const { query } = useRouter();
  const areaId: string = query.areaId?.toString() ?? '';
  const competitionId: string = query.competitionId?.toString() ?? '';
  const teamId: string = query.teamId?.toString() ?? '';

  return (
    <Layout>
      <Container>
        <div className="p-8">
          {areaId && competitionId && teamId ? (
            <MatchesMain areaId={areaId} competitionId={competitionId} teamId={teamId} />
          ) : (
            <></>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default MatchesPage;
