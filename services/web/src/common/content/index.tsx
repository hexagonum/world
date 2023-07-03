import { Icon } from '@chakra-ui/icons';
import {
  FaBitcoin,
  FaBuilding,
  FaClock,
  FaCloudSunRain,
  FaDollarSign,
  FaFutbol,
  FaGoogle,
  FaLanguage,
  FaMap,
  FaPassport,
  FaSearch,
  FaWarehouse,
  FaYoutube,
} from 'react-icons/fa';

export const LINKS = [
  {
    id: 'overview',
    icon: <Icon as={FaWarehouse} color={'teal'} />,
    href: '/',
    name: 'Overview',
    subpages: [],
  },
  {
    id: 'crypto',
    icon: <Icon as={FaBitcoin} color={'teal'} />,
    href: '/crypto/coins',
    name: 'Crypto',
    subpages: [],
  },
  {
    id: 'countries',
    icon: <Icon as={FaMap} color={'teal'} />,
    href: '/countries',
    name: 'Countries',
    subpages: [
      {
        id: 'currencies',
        icon: <Icon as={FaDollarSign} color={'teal'} />,
        href: '/currencies',
        name: 'Currencies',
      },
      {
        id: 'languages',
        icon: <Icon as={FaLanguage} color={'teal'} />,
        href: '/languages',
        name: 'Languages',
      },
      {
        id: 'organizations',
        icon: <Icon as={FaBuilding} color={'teal'} />,
        href: '/organizations',
        name: 'Organizations',
      },
      {
        id: 'passports',
        icon: <Icon as={FaPassport} color={'teal'} />,
        href: '/passports',
        name: 'Passports',
      },
      {
        id: 'timezones',
        icon: <Icon as={FaClock} color={'teal'} />,
        href: '/timezones',
        name: 'Timezones',
      },
    ],
  },
  {
    id: 'football',
    icon: <Icon as={FaFutbol} color={'teal'} />,
    href: '/football',
    name: 'Football',
    subpages: [],
  },
  {
    id: 'google',
    icon: <Icon as={FaGoogle} color={'teal'} />,
    href: '/google',
    name: 'Google',
    subpages: [
      {
        id: 'trends',
        icon: <Icon as={FaSearch} color={'teal'} />,
        href: '/google/trends',
        name: 'Trends',
      },
      {
        id: 'youtube',
        icon: <Icon as={FaYoutube} color={'teal'} />,
        href: '/google/youtube',
        name: 'YouTube',
      },
    ],
  },
  {
    id: 'weather',
    icon: <Icon as={FaCloudSunRain} color={'teal'} />,
    href: '/weather',
    name: 'Weather',
    subpages: [],
  },
];
