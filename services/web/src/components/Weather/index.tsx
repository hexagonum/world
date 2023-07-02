import { Card, CardBody, CardFooter, Divider, Text } from '@chakra-ui/react';
import Clock from '@world/components/Clock';
import { BASE_API } from '@world/configs';
import useFetch from '@world/hooks/use-fetch';
import Link from 'next/link';

export type WeatherProps = {
  city: string;
  latitude: number;
  longitude: number;
  timezone: number;
};

export type WeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
};

const weatherCodes: Record<number, string> = {
  0: 'clear sky',
  1: 'mainly clear',
  2: 'partly cloudy',
  3: 'overcast',
  45: 'fog',
  48: 'depositing rime fog',
  51: 'light drizzle',
  53: 'moderate drizzle',
  55: 'dense intensity drizzle',
  56: 'light freezing drizzle',
  57: 'dense intensity freezing drizzle',
  61: 'slight rain',
  63: 'moderate rain',
  65: 'heavy intensity rain',
  66: 'light freezing rain',
  67: 'heavy intensity freezing rain',
  71: 'slight snow fall',
  73: 'moderate snow fall',
  75: 'heavy intensity snow fall',
  77: 'snow grains',
  80: 'slight rain showers',
  81: 'moderate rain showers',
  82: 'violent rain showers',
  85: 'slight snow showers',
  86: 'heavy snow showers',
  95: 'thunderstorm: slight or moderate',
  96: 'slight thunderstorm',
  99: 'heavy hail thunderstorm',
};

export const Weather: React.FC<WeatherProps> = ({
  city = '',
  latitude = 0,
  longitude = 0,
  timezone = 0,
}) => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('latitude', latitude.toString());
  urlSearchParams.set('longitude', longitude.toString());
  const url = `${BASE_API}/weather?${urlSearchParams.toString()}`;
  console.log(url);
  const { data, loading, error } = useFetch<WeatherResponse>(url);

  if (loading) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <div className="flex justify-center items-center">Loading</div>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <div className="flex justify-center items-center">
            {error.message}
          </div>
        </CardBody>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="border border-gray-200">
        <CardBody>
          <div className="flex justify-center items-center">No Data</div>
        </CardBody>
      </Card>
    );
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`;

  return (
    <Card className="border border-gray-200">
      <CardBody>
        <div className="flex justify-between items-center">
          <div className="capitalize">
            <Text className="font-bold">{city}</Text>
            <Link href={googleMapsUrl} target="_blank">
              <Text className="text-xs">
                {Math.abs(data.latitude).toFixed(2)}&deg;
                {data.latitude >= 0 ? 'N' : 'S'} -{' '}
                {Math.abs(data.longitude).toFixed(2)}&deg;
                {data.longitude >= 0 ? 'E' : 'W'}
              </Text>
            </Link>
          </div>
          <div className="text-right">
            <p className="font-bold">
              {data.current_weather.temperature}&deg;C
            </p>
            <p className="capitalize text-xs">
              {weatherCodes[data.current_weather.weathercode] || 'N/A'}
            </p>
          </div>
        </div>
      </CardBody>
      <Divider className="border-gray-300" />
      <CardFooter>
        <Clock timezome={timezone} />
      </CardFooter>
    </Card>
  );
};
