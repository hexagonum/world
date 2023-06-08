import { Card, CardBody, Link, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { NEXT_PUBLIC_BASE_API } from '@world/configs';
import useFetch from '@world/hooks/use-fetch';
import Layout from '@world/layout';
import { unique } from '@world/utils/unique';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

type PassportRequirement = {
  passportCode: string;
  countryCode: string;
  requirement: string;
  country: {
    commonName: string;
    cca2: string;
    cca3: string;
    region: string;
    subregion: string;
  };
  passport: {
    countryCode: string;
    country: {
      commonName: string;
      cca2: string;
      cca3: string;
      region: string;
      subregion: string;
    };
    globalRank: number;
    individualRank: number;
    mobilityScore: number;
  };
};

const PassportSection: React.FC<{ countryCode: string }> = ({ countryCode = '' }) => {
  const [filterOptions, setFilterOptions] = useState<{ requirement: string }>({ requirement: '' });
  const url = `${NEXT_PUBLIC_BASE_API}/passports/${countryCode}`;
  const { loading, error, data } = useFetch<PassportRequirement[]>(url);

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

  if (!data || data.length === 0) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <p className="text-center">No Data</p>
        </CardBody>
      </Card>
    );
  }

  const requirements = data.map(
    ({ requirement: fullRequirement = '', country: { cca3, commonName } }: PassportRequirement) => {
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
      return { cca3, name: commonName, requirement, note: note };
    }
  );

  const requirementOptions: string[] = unique(requirements.map(({ requirement }) => requirement.toLowerCase()));
  requirementOptions.sort((a: string, b: string) => (a > b ? 1 : -1));

  const filteredRequirements = requirements.filter(({ requirement = '' }) => {
    const requirementFlag: boolean =
      filterOptions.requirement === '' ? true : requirement.toLowerCase() === filterOptions.requirement.toLowerCase();
    return requirementFlag;
  });

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-2xl md:text-4xl font-bold">{data[0].passport.country.commonName}</h1>
        <p className="capitalize text-xl md:text-2xl">#{data[0].passport.individualRank}</p>
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
            {filteredRequirements.map(({ cca3 = '', name = '', requirement = '', note = '' }, index: number) => {
              return (
                <Tr key={cca3}>
                  <Td>{index + 1}</Td>
                  <Td className="capitalize">
                    <Link href={`/passports/${cca3}`}>{name}</Link>
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
  );
};

const PassportPage: NextPage = () => {
  const { query } = useRouter();
  const countryCode: string = query.passport?.toString() ?? '';

  if (!countryCode) {
    return (
      <Layout>
        <Container>
          <div className="p-8">
            <Card className="border border-gray-200">
              <CardBody>
                <p className="text-center">Loading</p>
              </CardBody>
            </Card>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <PassportSection countryCode={countryCode} />
        </div>
      </Container>
    </Layout>
  );
};

export default PassportPage;
