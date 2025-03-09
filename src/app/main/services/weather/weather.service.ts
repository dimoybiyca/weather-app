import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CachedHttpClient } from 'app/core/http/cached-http-client/cached-http-client';
import { TForecastData } from 'app/main/types/forecast-data.type';
import { TForecastResponse } from 'app/main/types/forecast-response.type';
import { TWeatherData } from 'app/main/types/weather-data.type';
import { TWeatherResponse } from 'app/main/types/weather-response.type';
import { TCoordinates } from 'app/shared/types/coordinates.type';
import { environment } from 'environments/environment.development';
import { map } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly API_URL = environment.API_URL;
  private readonly API_KEY = environment.API_KEY;

  weather: WritableSignal<TWeatherData | null> = signal(null);
  forecast: WritableSignal<TForecastData[]> = signal([]);

  private http: CachedHttpClient = inject(CachedHttpClient);

  fetchWeather(params: TCoordinates): void {
    this.persistLocation(params);

    this.fetchCurrentWeather(params);

    this.fetchForecast(params);
  }

  fetchLatestLocation(): void {
    const location = localStorage.getItem('location');

    if (location) {
      const coordinates = JSON.parse(location);
      this.fetchWeather(coordinates);
    } else {
      this.requestUserLocation();
    }
  }

  private get commonParams(): Record<string, string> {
    return {
      appid: this.API_KEY,
      units: 'metric',
    };
  }

  private fetchCurrentWeather(params: TCoordinates): void {
    this.http
      .cachedGet<TWeatherResponse>(`${this.API_URL}/data/2.5/weather`, {
        params: { ...params, ...this.commonParams },
      })
      .pipe(map(this.toWeatherData))
      .subscribe((res) => {
        this.weather.set(res);
      });
  }

  private fetchForecast(params: TCoordinates): void {
    this.http
      .cachedGet<TForecastResponse>(`${this.API_URL}/data/2.5/forecast`, {
        params: { ...params, ...this.commonParams, cnt: 6 },
      })
      .pipe(map(this.toForecastData))
      .subscribe((res) => {
        this.forecast.set(res);
      });
  }

  private toWeatherData(res: TWeatherResponse): TWeatherData {
    return {
      temperature: Math.round(res.main.temp),
      tempMin: Math.round(res.main.temp_min),
      tempMax: Math.round(res.main.temp_max),
      cloudy: res.clouds.all,
      condition: res.weather[0].main,
      description: res.weather[0].description,
      humidity: res.main.humidity,
      wind: Math.round(res.wind.speed),
      date: new Date((res.dt + res.timezone) * 1000),
      city: res.name,
    };
  }

  private toForecastData(res: TForecastResponse): TForecastData[] {
    return res.list.map((item) => ({
      temperature: Math.round(item.main.temp),
      condition: item.weather[0].main,
      date: new Date((item.dt + res.city.timezone) * 1000),
    }));
  }

  private requestUserLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.fetchWeather({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }

  private persistLocation(coordinates: TCoordinates): void {
    localStorage.setItem('location', JSON.stringify(coordinates));
  }
}
