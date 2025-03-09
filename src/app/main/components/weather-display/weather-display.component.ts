import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { WeatherIconComponent } from 'app/main/components/weather-icon/weather-icon.component';
import { TWeatherData } from 'app/main/types/weather-data.type';
import { NumberAnimationDirective } from 'app/shared/directives/number-animation.directive';

@Component({
  selector: 'wa-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, WeatherIconComponent, NumberAnimationDirective],
})
export class WeatherDisplayComponent {
  weatherData: InputSignal<TWeatherData | null> = input.required();

  get data(): TWeatherData | null {
    return this.weatherData();
  }
}
