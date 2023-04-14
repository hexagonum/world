import useFetch from '@weather/hooks/use-fetch';
import { NextPage } from 'next';

const cities: { id: string; name: string; latitude: number; longitude: number }[] = [
  {
    id: 'ho-chi-minh-city',
    name: 'Ho Chi Minh City',
    latitude: 10.82,
    longitude: 106.63,
  },
  {
    id: 'hanoi',
    name: 'Hanoi',
    latitude: 21.02,
    longitude: 105.84,
  },
  {
    id: 'singapore',
    name: 'Singapore',
    latitude: 1.29,
    longitude: 103.85,
  },
  {
    id: 'seoul',
    name: 'Seoul',
    latitude: 37.57,
    longitude: 126.98,
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    latitude: -37.81,
    longitude: 144.96,
  },
  {
    id: 'dallas',
    name: 'Dallas',
    latitude: 32.78,
    longitude: -96.81,
  },
];

type WeatherResponse = {
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

type WeatherProps = {
  city: string;
  latitude: number;
  longitude: number;
};

const Weather: React.FC<WeatherProps> = ({ city, latitude, longitude }) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const { data, loading, error } = useFetch<WeatherResponse>(url);

  if (loading) {
    return (
      <div className="border border-gray-700 rounded p-4">
        <div className="flex justify-center items-center">Loading</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-gray-700 rounded p-4">
        <div className="flex justify-center items-center">{error.message}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="border border-gray-700 rounded p-4">
        <div className="flex justify-center items-center">No Data</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-700 rounded p-4">
      <div className="flex justify-between items-center">
        <div className="uppercase">
          <p className="font-bold">{city}</p>
          <p className="text-xs">
            {Math.abs(data.latitude).toFixed(2)}&deg;{data.latitude >= 0 ? 'N' : 'S'} -{' '}
            {Math.abs(data.longitude).toFixed(2)}&deg;{data.longitude >= 0 ? 'E' : 'W'}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold">{data.current_weather.temperature}&deg;C</p>
          <p className="capitalize text-xs">{weatherCodes[data.current_weather.weathercode] || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export const HomePage: NextPage = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-gray-900 text-gray-100 h-screen">
      <div className="flex flex-col h-full">
        <nav className="border-b border-gray-700">
          <div className="container mx-auto px-8 py-4">
            <h1 className="uppercase font-bold">Weather</h1>
          </div>
        </nav>
        <main className="grow overflow-hidden">
          <div className="h-full overflow-auto">
            <div className="container mx-auto p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {cities.map((city) => {
                  return <Weather key={city.id} city={city.name} latitude={city.latitude} longitude={city.longitude} />;
                })}
              </div>
            </div>
          </div>
        </main>
        <footer className="border-t border-gray-700">
          <div className="container mx-auto px-8 py-4">
            <p className="uppercase">&copy; {year} Weather</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
