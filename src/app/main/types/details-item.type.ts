import { TWeatherData } from 'app/main/types/weather-data.type';
import { TIcon } from 'app/shared/types/icon.type';

export type TDetailsItem = {
  title: string;
  field: keyof TWeatherData;
  unit: string;
  icon: string | TIcon;
};
