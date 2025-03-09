import { TWeatherCondition } from 'app/main/types/weather-condition.type';

export type TForecastData = {
  date: Date;
  temperature: number;
  condition: TWeatherCondition;
};
