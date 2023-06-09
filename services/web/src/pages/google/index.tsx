import Container from '@world/components/Container';
import Layout from '@world/layout';
import { NextPage } from 'next';

const GooglePage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="p-8"></div>
      </Container>
    </Layout>
  );
};

export default GooglePage;
