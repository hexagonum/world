import { Box, Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { NEXT_PUBLIC_BASE_API } from '@world/configs';
import useFetch from '@world/hooks/use-fetch';
import Link from 'next/link';

export type Article = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type ArticlesProps = {
  category?: string;
  country?: string;
  articles?: Article[];
};

export const Articles: React.FC<ArticlesProps> = ({ category = 'general', country = '', articles = [] }) => {
  const urlSearchParams = new URLSearchParams();
  if (category) urlSearchParams.set('category', category);
  if (country) urlSearchParams.set('country', country);
  const url = `${NEXT_PUBLIC_BASE_API}/news/headlines?${urlSearchParams.toString()}`;
  const { loading, error, data } = useFetch<Article[]>(url);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
      {(data || articles).map(({ title, description = '', author = '', url = '', source: { name = '' } }) => {
        return (
          <div key={title} className="col-span-1">
            <Card className="border border-gray-200">
              <CardBody>
                <Link href={url} target="_blank">
                  <Box className="flex flex-col gap-2">
                    <Heading size="sm">{title}</Heading>
                    {(description || '').length > 0 ? <Text>{description || 'N/A'}</Text> : <></>}
                    <Text>
                      {name} - {author}
                    </Text>
                  </Box>
                </Link>
              </CardBody>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
