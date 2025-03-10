import { TWeather, TWeatherMain } from 'app/main/types/weather.type';
import { TCoordinates } from 'app/shared/types/coordinates.type';

export type TWeatherResponse = {
  base: string;
  visibility: number;
  coord: TCoordinates;
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  main: TWeatherMain;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: TWeather[];
};
