import { useQuery } from '@apollo/client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, CardBody, Divider, Text } from '@chakra-ui/react';
import { Container } from '@world/components/Container';
import { FOOTBALL_MATCHES_QUERY } from '@world/graphql/queries/football';
import Layout from '@world/layout';
import { Football, FootballMatch } from '@world/types/football';
import { unique } from '@world/utils/unique';
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
  const statuses = unique(matches.map(({ status }) => status));
  const matchesByStatuses: { status: string; matches: FootballMatch[] }[] = statuses.map((status) => {
    const matchesByStatus: FootballMatch[] = matches.filter(({ status: matchStatus }) => status === matchStatus);
    return { status, matches: matchesByStatus };
  });

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
        {matchesByStatuses.map(({ status, matches }) => {
          return (
            <div key={status} className="flex flex-col gap-4">
              <h2 className="text-xl">{status}</h2>
              <Divider />
              {matches.map(({ homeTeam, awayTeam, score, utcDate }) => {
                const d: Date = new Date(utcDate);
                d.setTime(d.getTime());
                return (
                  <Card key={`${homeTeam.id}-${awayTeam.id}`} className="border border-gray-200">
                    <CardBody>
                      <div className="flex flex-col gap-2 md:gap-4">
                        <div className="flex justify-between items-center">
                          <Text className="font-medium">{competition.name}</Text>
                          <Text className="text-gray-500">
                            {d.toLocaleDateString()} {d.toLocaleTimeString()}
                          </Text>
                        </div>
                        <div className={`${homeTeam.name === team.name ? 'font-bold' : ''}`}>
                          <div className="flex justify-between items-center">
                            <p>{homeTeam.name}</p>
                            <p>{score.fullTime.home}</p>
                          </div>
                        </div>
                        <div className={`${awayTeam.name === team.name ? 'font-bold' : ''}`}>
                          <div className="flex justify-between items-center">
                            <p>{awayTeam.name}</p>
                            <p>{score.fullTime.away}</p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
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
