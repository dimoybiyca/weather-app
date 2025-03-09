import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { WeatherIconComponent } from 'app/main/components/weather-icon/weather-icon.component';
import { TForecastData } from 'app/main/types/forecast-data.type';
import { TemperaturePipe } from 'app/shared/pipes/temperature.pipe';

@Component({
  selector: 'wa-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WeatherIconComponent, DatePipe, TemperaturePipe],
})
export class WeatherForecastComponent {
  forecasts: InputSignal<TForecastData[]> = input.required();
}
