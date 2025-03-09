import { TDetailsItem } from 'app/main/types/details-item.type';

export const DETAILS_LIST: TDetailsItem[] = [
  {
    title: 'Temp max',
    field: 'tempMax',
    unit: '°C',
    icon: {
      type: 'svg',
      icon: 'TEMPERATURE',
      color: '--red',
    },
  },
  {
    title: 'Temp min',
    field: 'tempMin',
    unit: '°C',
    icon: {
      type: 'svg',
      icon: 'TEMPERATURE',
      color: '--blue',
    },
  },
  {
    title: 'Cloudy',
    field: 'cloudy',
    unit: '%',
    icon: 'cloud',
  },
  {
    title: 'Humidity',
    field: 'humidity',
    unit: '%',
    icon: 'droplet',
  },
  {
    title: 'Wind',
    field: 'wind',
    unit: 'km/h',
    icon: 'air',
  },
];
