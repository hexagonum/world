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
import Container from '@world/components/Container';
import { LANGUAGE_QUERY } from '@world/graphql/queries/languages';
import Layout from '@world/layout';
import { unique } from '@world/utils/unique';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Language = {
  code: string;
  name: string;
  countries: {
    cca2: string;
    cca3: string;
    commonName: string;
    region: string;
  }[];
};

const LanguageSection: React.FC<{ code: string }> = ({ code }) => {
  const { loading, error, data } = useQuery<{ language: Language }>(
    LANGUAGE_QUERY,
    {
      variables: { code },
    }
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
          <p className="text-center">{error.message}</p>
        </CardBody>
      </Card>
    );
  }

  if (!data?.language) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <p className="text-center">No Data</p>
        </CardBody>
      </Card>
    );
  }

  const language = data.language;
  const regions: string[] = unique(
    language.countries.map(({ region }: { region: string }) => region)
  );
  regions.sort((a: string, b: string) => (a > b ? 1 : -1));

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <h1 className="capitalize text-4xl font-bold">{language.name}</h1>
      <TableContainer className="shadow border rounded">
        <Table>
          <Tbody>
            <Tr>
              <Td>Code</Td>
              <Td isNumeric>{language.code}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Divider className="border-gray-300" />
      <h2 className="font-semibold text-xl">
        Countries ({language.countries.length})
      </h2>{' '}
      <TableContainer className="shadow border rounded">
        <Table>
          <Tbody>
            {regions.map((region: string) => {
              const countriesByRegion = language.countries.filter(
                ({ region: countryRegion }) => region === countryRegion
              );
              return (
                <Tr key={region}>
                  <Td>
                    {region} ({countriesByRegion.length})
                  </Td>
                  <Td isNumeric>
                    <div className="flex flex-wrap justify-end gap-1 md:gap-2">
                      {countriesByRegion.map(({ cca3, commonName }) => {
                        return (
                          <Link key={cca3} href={`/countries/${cca3}`}>
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

const LanguagePage: NextPage = () => {
  const { query } = useRouter();
  const languageCode: string = query.language?.toString() ?? '';

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <LanguageSection code={languageCode} />
        </div>
      </Container>
    </Layout>
  );
};

export default LanguagePage;
