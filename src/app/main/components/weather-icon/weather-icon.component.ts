import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { TWeatherCondition } from 'app/main/types/weather-condition.type';
import { IconComponent } from 'app/shared/components/icon/icon.component';

@Component({
  selector: 'wa-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrl: './weather-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class WeatherIconComponent {
  condition: InputSignal<TWeatherCondition> = input.required();

  private readonly ICON_MAP: Record<TWeatherCondition, string> = {
    Clear: 'sunny',
    Clouds: 'cloud',
    Drizzle: 'drizzle',
    Rain: 'rain',
    Snow: 'ac_unit',
    Atmosphere: 'mist',
    Thunderstorm: 'thunderstorm',
  };

  getIconName(): string {
    return this.ICON_MAP[this.condition()];
  }
}
