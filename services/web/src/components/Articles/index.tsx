import { Box, Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { NEXT_PUBLIC_BASE_API } from '@world/common/environments';
import useFetch from '@world/common/hooks/use-fetch';
import { Article } from '@world/types/news';
import Link from 'next/link';

export type ArticlesProps = {
  category?: string;
  country?: string;
  articles?: Article[];
};

export const Articles: React.FC<ArticlesProps> = ({
  category = 'general',
  country = '',
  articles = [],
}) => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('pageSize', '12');
  if (country) urlSearchParams.set('country', country);
  if (category) urlSearchParams.set('category', category);
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
      {(data || articles).map(
        ({
          title,
          description = '',
          url = '',
          urlToImage = '',
          source: { name: sourceName = '' },
        }) => {
          return (
            <div key={title} className="col-span-1">
              <Card className="border border-gray-200 overflow-hidden">
                <div
                  className="aspect-video bg-teal-600"
                  style={{ backgroundImage: `url(${urlToImage || ''})` }}
                ></div>
                <CardBody>
                  <Link href={url} target="_blank">
                    <Box className="flex flex-col gap-2">
                      <Heading size="sm" className="line-clamp-2">
                        {title}
                      </Heading>
                      {(description || '').length > 0 ? (
                        <Text className="line-clamp-4 text-gray-500">
                          {description || 'N/A'}
                        </Text>
                      ) : (
                        <></>
                      )}
                      <Text className="font-medium">{sourceName}</Text>
                    </Box>
                  </Link>
                </CardBody>
              </Card>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Articles;
