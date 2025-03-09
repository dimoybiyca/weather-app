import { TWeatherCondition } from 'app/main/types/weather-condition.type';

export type TWeatherData = {
  condition: TWeatherCondition;
  description: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  cloudy: number;
  wind: number;
  city: string;
  date: Date;
};
