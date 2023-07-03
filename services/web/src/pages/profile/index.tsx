import { useUser } from '@auth0/nextjs-auth0/client';
import { Card, CardBody, Input, Text } from '@chakra-ui/react';
import { Container } from '@world/components/Container';
import { Layout } from '@world/layout';
import { NextPage } from 'next';
import Image from 'next/image';

const ProfilePage: NextPage = () => {
  const { user } = useUser();

  return (
    <Layout searchSection={<></>}>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <Card className="border border-gray-200 shadow">
              <CardBody>
                <div className="flex flex-col md:flex-row items-center gap-4 gap-8">
                  <div>
                    <Image
                      src={user?.picture ?? ''}
                      alt={user?.nickname ?? ''}
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-full"
                    />
                  </div>
                  <div className="grow">
                    <div className="flex flex-col gap-1 md:gap-2">
                      <Text>Name</Text>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        value={user?.name ?? ''}
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                      <Text>Username</Text>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={user?.nickname ?? ''}
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                      <Text>Email Address</Text>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        value={user?.email ?? ''}
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
