import { Button } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { Videos } from '@world/components/Videos';
import { apolloClient } from '@world/graphql';
import { YOUTUBE_CATEGORIES_QUERY } from '@world/graphql/queries/youtube';
import Layout from '@world/layout';
import { YouTube, YouTubeCategory } from '@world/types/youtube';
import { NextPage } from 'next';
import { useState } from 'react';

type YouTubePageProps = { categories: YouTubeCategory[] };

const YouTubePage: NextPage<YouTubePageProps> = ({ categories = [] }) => {
  const [categoryId, setCategoryId] = useState('10');

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="w-full overflow-auto">
              <div className="flex gap-2 md:gap-4">
                {categories.map(({ id, title }) => (
                  <div key={id}>
                    <Button
                      colorScheme="teal"
                      className="capitalize"
                      variant={id === categoryId ? 'solid' : 'outline'}
                      onClick={() => setCategoryId(id)}
                    >
                      {title}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Videos categoryId={categoryId} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{ props: { categories: YouTubeCategory[] } }> => {
  try {
    const data = await apolloClient.query<{ youtube: YouTube }>({ query: YOUTUBE_CATEGORIES_QUERY });
    const categories: YouTubeCategory[] = [...data.data.youtube.categories].sort((a, b) =>
      a.title > b.title ? 1 : -1
    );
    return { props: { categories } };
  } catch (error) {
    console.error(error);
    return { props: { categories: [] } };
  }
};

export default YouTubePage;
