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

const top: string[] = ['Gaming', 'Music', 'News & Politics', 'Sports'];

const YouTubePage: NextPage<YouTubePageProps> = ({ categories = [] }) => {
  const [categoryId, setCategoryId] = useState('10');

  const topCategories = categories.filter(({ title }) => top.includes(title));
  const otherCategories = categories.filter(({ title }) => !top.includes(title));

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {topCategories.map(({ id, title }) => {
                return (
                  <div key={id} className="col-span-1">
                    <Button
                      colorScheme="teal"
                      className="capitalize w-full"
                      variant={id === categoryId ? 'solid' : 'outline'}
                      onClick={() => setCategoryId(id)}
                    >
                      {title}
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="w-full overflow-hidden">
              <div className="flex flex-wrap gap-1 md:gap-2">
                {otherCategories.map(({ id, title }) => (
                  <div key={id}>
                    <Button
                      size="xs"
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
