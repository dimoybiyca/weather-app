import { TForecast } from 'app/main/types/forecast.type';
import { TCoordinates } from 'app/shared/types/coordinates.type';

export type TForecastResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: TForecast[];
  city: {
    id: number;
    name: string;
    coord: TCoordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};
