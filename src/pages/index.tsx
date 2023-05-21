import { Card, CardBody, CardFooter, Divider, Input } from '@chakra-ui/react';
import Footer from '@weather/components/Footer';
import Navbar from '@weather/components/Navbar';
import { City, cities } from '@weather/configs';
import useFetch from '@weather/hooks/use-fetch';
import { addZero } from '@weather/utils/add-zero';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

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
  timezone: number;
};

const oneHour = 1000 * 60 * 60;

const getClock = (timezome: number) => {
  const d: Date = new Date();
  const time: number = d.getTime();
  const machineTimezone: number = d.getTimezoneOffset() / -60;
  const cityTime: number = time - oneHour * (timezome - machineTimezone);
  const cityD: Date = new Date(cityTime);
  const hh: string = addZero(cityD.getHours());
  const mm: string = addZero(cityD.getMinutes());
  const ss: string = addZero(cityD.getSeconds());
  return `${hh}:${mm}:${ss}`;
};

const Clock: React.FC<{ timezome: number }> = ({ timezome }) => {
  const [clock, setClock] = useState(getClock(timezome));

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(getClock(timezome));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezome]);

  return (
    <div className="w-full flex justify-between items-center">
      <p>
        Timezone: {timezome > 0 ? '+' : ''}
        {timezome}
      </p>
      <p className="font-bold">{clock}</p>
    </div>
  );
};

const Weather: React.FC<WeatherProps> = ({ city = '', latitude = 0, longitude = 0, timezone = 0 }) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const { data, loading, error } = useFetch<WeatherResponse>(url);

  if (loading) {
    return (
      <Card>
        <CardBody>
          <div className="flex justify-center items-center">Loading</div>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <div className="flex justify-center items-center">{error.message}</div>
        </CardBody>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardBody>
          <div className="flex justify-center items-center">No Data</div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <div className="flex justify-between items-center">
          <div className="capitalize">
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
      </CardBody>
      <Divider className="border-gray-300" />
      <CardFooter>
        <Clock timezome={timezone} />
      </CardFooter>
    </Card>
  );
};

export const HomePage: NextPage = () => {
  const [query, setQuery] = useState<string>('');

  const filterCities: City[] = cities.filter(({ name, country }: City) => {
    const nameFlag = query !== '' ? name.toLowerCase().includes(query.toLowerCase()) : true;
    const countryFlag = country !== '' ? country.toLowerCase().includes(query.toLowerCase()) : true;
    return nameFlag || countryFlag;
  });
  const countries: string[] = [...new Set(filterCities.map(({ country }) => country))];
  const citiesByCountries = countries.map((country) => {
    const citiesByCountry = filterCities.filter(({ country: cityCountry }) => country === cityCountry);
    return { country, cities: citiesByCountry };
  });

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="grow overflow-hidden">
        <div className="h-full overflow-auto">
          <div className="container mx-auto p-8">
            <div className="flex flex-col gap-4">
              <Input
                id="query"
                name="query"
                value={query}
                placeholder="Query"
                onChange={(event) => setQuery(event.target.value)}
                size="lg"
              />
              <Divider />
              {citiesByCountries.map(({ country = '', cities = [] }) => {
                return (
                  <div key={country} className="flex flex-col gap-4">
                    <h2 className="text-md font-medium">
                      {country} ({cities.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                      {cities.map(({ id, name, latitude, longitude, timezone }: City) => (
                        <Weather key={id} city={name} latitude={latitude} longitude={longitude} timezone={timezone} />
                      ))}
                    </div>
                    <Divider />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
