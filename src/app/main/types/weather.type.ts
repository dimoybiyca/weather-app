import { TWeatherCondition } from 'app/main/types/weather-condition.type';

export type TWeather = {
  id: number;
  main: TWeatherCondition;
  description: string;
  icon: string;
};

export type TWeatherMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf?: number;
};

export type TWeatherWind = {
  speed: number;
  deg: number;
  gust: number;
};
