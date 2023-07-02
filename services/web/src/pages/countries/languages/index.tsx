import {
  Badge,
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
import Container from '@world/components/Container';
import { apolloClient } from '@world/graphql';
import { COUNTRIES_LANGUAGES_QUERY } from '@world/graphql/queries/countries';
import Layout from '@world/layout';
import { Country } from '@world/types';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type LanguagesPageProps = {
  countries: Country[];
};

export const LanguagesPage: NextPage<LanguagesPageProps> = ({
  countries = [],
}) => {
  const [query, setQuery] = useState<string>('');

  const countriesByFilter = countries.filter(
    ({ commonName = '', languages = [] }) => {
      const languageCodes: string[] = languages.map(
        ({ code = '' }: { code: string }) => code
      );
      const languageNames: string[] = languages.map(
        ({ name = '' }: { name: string }) => name
      );
      const codeFlag: boolean =
        query !== ''
          ? languageCodes.some((code: string) =>
              code.toLowerCase().includes(query.toLowerCase())
            )
          : true;
      const nameFlag: boolean =
        query !== ''
          ? languageNames.some((name: string) =>
              name.toLowerCase().includes(query.toLowerCase())
            )
          : true;
      const commonNameFlag: boolean =
        query !== ''
          ? commonName.toLowerCase().includes(query.toLowerCase())
          : true;
      return codeFlag || nameFlag || commonNameFlag;
    }
  );

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
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
            <div className="shadow">
              <TableContainer className="border rounded">
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Country ({countriesByFilter.length})</Th>
                      <Th isNumeric>Total</Th>
                      <Th>Languages</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesByFilter.map(
                      ({ commonName = '', cca3 = '', languages = [] }) => {
                        return (
                          <Tr key={cca3}>
                            <Td>
                              <Link href={`/countries/${cca3}`}>
                                {commonName}
                              </Link>
                            </Td>
                            <Td isNumeric>{languages.length}</Td>
                            <Td>
                              <div className="whitespace-normal">
                                {languages.length > 0 ? (
                                  <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                    {languages.map(
                                      ({ code = '', name = '' }) => {
                                        return (
                                          <Link
                                            key={code}
                                            href={`/languages/${code}`}
                                          >
                                            <Badge colorScheme="teal">
                                              {name}
                                            </Badge>
                                          </Link>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </Td>
                          </Tr>
                        );
                      }
                    )}
                  </Tbody>
                  <TableCaption>
                    <p className="pb-4">
                      Languages ({countriesByFilter.length})
                    </p>
                  </TableCaption>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: { countries: Country[] };
}> => {
  try {
    const data = await apolloClient.query<{ countries: Country[] }>({
      query: COUNTRIES_LANGUAGES_QUERY,
    });
    const countries: Country[] = [...data.data.countries];
    countries.sort((a, b) => b.languages.length - a.languages.length);
    return { props: { countries } };
  } catch (error) {
    console.error('LanguagesPage', error);
    return { props: { countries: [] } };
  }
};

export default LanguagesPage;
