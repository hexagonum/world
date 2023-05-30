import { Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import passports from '@world/data/passports/passports.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const PassportsPage: NextPage = () => {
  const [query, setQuery] = useState<string>('');

  const filterdPassports = passports.filter(({ name = '', cca2 = '', cca3 = '' }) => {
    const cca2Flag: boolean = query !== '' ? cca2.toLowerCase().includes(query.toLowerCase()) : true;
    const cca3Flag: boolean = query !== '' ? cca3.toLowerCase().includes(query.toLowerCase()) : true;
    const nameFlag: boolean = query !== '' ? name.toLowerCase().includes(query.toLowerCase()) : true;
    return cca2Flag || cca3Flag || nameFlag;
  });

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
              onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
              className="shadow"
            />
            <TableContainer className="border rounded shadow">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Global Rank</Th>
                    <Th>Individual Rank</Th>
                    <Th>Country</Th>
                    <Th isNumeric>Mobility Score</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filterdPassports.map(
                    ({ name = '', mobilityScore = 0, id = '', globalRank = 0, individualRank = 0 }) => {
                      return (
                        <Tr key={name}>
                          <Td>{globalRank}</Td>
                          <Td>{individualRank}</Td>
                          <Td>
                            <Link href={`/passports/${id}`}>{name}</Link>
                          </Td>
                          <Td isNumeric>{mobilityScore}</Td>
                        </Tr>
                      );
                    }
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PassportsPage;
