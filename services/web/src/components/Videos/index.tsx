import { useQuery } from '@apollo/client';
import { Card, CardBody } from '@chakra-ui/react';
import { YOUTUBE_VIDEOS_QUERY } from '@world/graphql/queries/youtube';
import { YouTube, YouTubeVideo } from '@world/types/youtube';
import Image from 'next/image';
import Link from 'next/link';

export type VideosProps = { categoryId?: string; countryCode?: string; maxResults?: number };

export const Videos: React.FC<VideosProps> = ({ categoryId = '', countryCode = '', maxResults = 50 }) => {
  const options = { variables: { categoryId, countryCode, maxResults } };
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
