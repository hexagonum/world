import { Card, CardBody, Link, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { NEXT_PUBLIC_BASE_API } from '@world/configs';
import isoAlpha2Codes from '@world/data/codes/iso-alpha-2.json';
import useFetch from '@world/hooks/use-fetch';
import Layout from '@world/layout';
import { unique } from '@world/utils/unique';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

type Passport = {
  commonName: string;
  cca2: string;
  cca3: string;
  passportGlobalRank: number;
  passportIndividualRank: number;
  passportMobilityScore: number;
  passportRequirements: Record<string, string>;
};

const PassportSection: React.FC = () => {
  const [filterOptions, setFilterOptions] = useState<{ requirement: string }>({ requirement: '' });
  const { query } = useRouter();
  const countryCode: string = query.passport?.toString() ?? '';
  const { loading, error, data } = useFetch<Passport>(`${NEXT_PUBLIC_BASE_API}/countries/${countryCode}/passports`);

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
  const requirements = Object.keys(data.passportRequirements).map((cca2: string) => {
    const fullRequirement: string = data.passportRequirements[cca2] || '';
    const name: string = (isoAlpha2Codes as Record<string, string>)[cca2];
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
    return { cca2, name, requirement, note: note };
  });

  const requirementOptions: string[] = unique(requirements.map(({ requirement }) => requirement.toLowerCase()));
  requirementOptions.sort((a: string, b: string) => (a > b ? 1 : -1));

  const filteredRequirements = requirements.filter(({ requirement = '' }) => {
    const requirementFlag: boolean =
      filterOptions.requirement === '' ? true : requirement.toLowerCase() === filterOptions.requirement.toLowerCase();
    return requirementFlag;
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-2xl md:text-4xl font-bold">{data.commonName}</h1>
        <p className="capitalize text-xl md:text-2xl">#{data.passportIndividualRank}</p>
      </div>
      <Select
        id="requirement"
        name="requirement"
        placeholder="Requirement"
        value={filterOptions.requirement}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setFilterOptions({ ...filterOptions, requirement: event.target.value })
        }
        className="shadow uppercase"
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
            {filteredRequirements.map(({ cca2 = '', name = '', requirement = '', note = '' }, index: number) => {
              return (
                <Tr key={cca2}>
                  <Td>{index + 1}</Td>
                  <Td className="capitalize">
                    <Link href={`/passports/${cca2}`}>{name}</Link>
                  </Td>
                  <Td className="capitalize">{requirement}</Td>
                  <Td className="capitalize">{note || 'N/A'}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const PassportPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <PassportSection />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PassportPage;
