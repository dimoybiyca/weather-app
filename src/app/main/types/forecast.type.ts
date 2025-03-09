import {
  TWeather,
  TWeatherMain,
  TWeatherWind,
} from 'app/main/types/weather.type';

export type TForecast = {
  dt: number;
  main: TWeatherMain;
  weather: TWeather[];
  wind: TWeatherWind;
  visibility: number;
  pop: number;
  dt_txt: string;
  clouds: {
    all: number;
  };
  sys: {
    pod: string;
  };
};
