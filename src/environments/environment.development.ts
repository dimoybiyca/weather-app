import { TEnvironment } from 'environments/env-structure.type';

export const environment: TEnvironment = {
  API_URL: 'https://api.openweathermap.org',
  API_KEY: 'api key here',
  CACHE_LIFETIME: 10 * 60 * 1000, // 10 minutes (600000 milliseconds)
};
