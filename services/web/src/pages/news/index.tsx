import { Button } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { NEXT_PUBLIC_BASE_API } from '@world/configs';
import { Articles, Article } from '@world/components/Articles';
import { Layout } from '@world/layout';
import { NextPage } from 'next';
import { useState } from 'react';

type NewsPageProps = {
  articles: Article[];
};

const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

const NewsPage: NextPage<NewsPageProps> = ({ articles = [] }) => {
  const [category, setCategory] = useState('general');

  return (
    <Layout>
      <Container>
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="w-full overflow-auto">
              <div className="flex gap-4">
                {categories.map((c) => (
                  <div key={c}>
                    <Button
                      colorScheme="teal"
                      className="capitalize"
                      variant={c === category ? 'solid' : 'outline'}
                      onClick={() => setCategory(c)}
                    >
                      {c}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Articles category={category} country="us" articles={articles} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{ props: { articles: Article[] } }> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/news/headlines?country=us`);
    const articles: Article[] = await response.json();
    return { props: { articles } };
  } catch (error) {
    console.error(error);
    return { props: { articles: [] } };
  }
};

export default NewsPage;
