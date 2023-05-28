import { Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import passports from '@world/data/passports/passports.json';
import requirements from '@world/data/passports/requirements.json';
import Layout from '@world/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

type Passport = { id: string; name: string; individualRank: number };

const PassportPage: NextPage = () => {
  const [filterOptions, setFilterOptions] = useState<{ requirement: string }>({ requirement: '' });
  const { query } = useRouter();
  const passportId: string = query.passport?.toString() ?? '';
  const passport: Passport = passports.find(({ id }) => id.toLowerCase() === passportId.toLowerCase()) ?? {
    id: '',
    name: '',
    individualRank: 0,
  };
  const requirementsMap: Record<string, string> =
    (requirements as Record<string, Record<string, string>>)[passportId] || {};
  const requirementsList = Object.keys(requirementsMap).map((id) => {
    const fullRequirement: string = requirementsMap[id] || '';
    const name: string = id.replaceAll('-', ' ');
    const [part1 = '', part2 = '', part3 = ''] = fullRequirement.split('/');
    const trim1 = part1.trim();
    const trim2 = part2.trim();
    const trim3 = part3.trim();
    let requirement: string = '';
    let note: string = '';
    if (trim3 !== '') {
      requirement = `${trim1} / ${trim2}`;
      note = trim3;
    } else if (trim2 !== '') {
      requirement = trim1;
      note = trim2;
    } else {
      requirement = trim1;
    }
    return { id, name, requirement, note: note };
  });
  const requirementOptions: string[] = [
    ...new Set(requirementsList.map(({ requirement }) => requirement.toLowerCase())),
  ].sort((a: string, b: string) => (a > b ? 1 : -1));
  const filteredRequirements = requirementsList.filter(({ requirement = '' }) => {
    const requirementFlag: boolean =
      filterOptions.requirement === '' ? true : requirement.toLowerCase() === filterOptions.requirement.toLowerCase();
    return requirementFlag;
  });

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex justify-between items-center">
              <h1 className="capitalize text-2xl md:text-4xl font-bold">{passport.name}</h1>
              <p className="capitalize text-xl md:text-2xl">#{passport.individualRank}</p>
            </div>
            <Select
              id="requirement"
              name="requirement"
              placeholder="Requirement"
              value={filterOptions.requirement}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setFilterOptions({ ...filterOptions, requirement: event.target.value })
              }
              className="shadow capitalize"
            >
              {requirementOptions.map((requirement) => (
                <option key={requirement} value={requirement}>
                  {requirement}
                </option>
              ))}
            </Select>
            <TableContainer className="border shadow rounded">
              <Table>
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Country</Th>
                    <Th>Requirement</Th>
                    <Th>Note</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredRequirements.map(({ id, name, requirement, note }, index: number) => {
                    return (
                      <Tr key={id}>
                        <Td>{index + 1}</Td>
                        <Td className="capitalize">
                          <Link href={`/passports/${id}`}>{name}</Link>
                        </Td>
                        <Td className="capitalize">{requirement}</Td>
                        <Td className="capitalize">{note || 'N/A'}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PassportPage;
