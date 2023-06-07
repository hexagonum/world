import { useQuery } from '@apollo/client';
import { Button, Card, CardBody } from '@chakra-ui/react';
import Container from '@world/components/Container';
import { apolloClient } from '@world/graphql';
import { YOUTUBE_CATEGORIES_QUERY, YOUTUBE_VIDEOS_QUERY } from '@world/graphql/queries/youtube';
import Layout from '@world/layout';
import { YouTube, YouTubeCategory, YouTubeVideo } from '@world/types/youtube';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const YouTubeMain: React.FC<{ categoryId: string }> = ({ categoryId = '' }) => {
  const options = { variables: { categoryId } };
  const { loading, error, data } = useQuery<{ youtube: YouTube }>(YOUTUBE_VIDEOS_QUERY, options);

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
          <p className="text-center">{error.message} </p>
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

  const videos: YouTubeVideo[] = data.youtube.videos;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
      {videos.map(({ id = '', title = '', channelId = '', channelTitle = '', thumbnails }) => {
        const src: string =
          thumbnails?.maxres?.url ||
          thumbnails?.standard?.url ||
          thumbnails?.high?.url ||
          thumbnails?.medium?.url ||
          thumbnails?.default?.url;
        const width: number =
          thumbnails?.maxres?.width ||
          thumbnails?.standard?.width ||
          thumbnails?.high?.width ||
          thumbnails?.medium?.width ||
          thumbnails?.default?.width;
        const height: number =
          thumbnails?.maxres?.height ||
          thumbnails?.standard?.height ||
          thumbnails?.high?.height ||
          thumbnails?.medium?.height ||
          thumbnails?.default?.height;
        return (
          <div key={id} className="col-span-1">
            <Link href={`https://youtu.be/${id}`} target="_blank">
              <Card className="border border-gray-200 overflow-hidden">
                <div className="w-full">
                  <Image src={src} alt={title} width={width} height={height} className="w-full" />
                </div>
                <CardBody>
                  <h2 className="font-bold truncate" title={title}>
                    {title}
                  </h2>
                  <Link href={`https://www.youtube.com/channel/${channelId}`} target="_blank">
                    <p className="text-gray-500">{channelTitle}</p>
                  </Link>
                </CardBody>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

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
            <YouTubeMain categoryId={categoryId} />
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
