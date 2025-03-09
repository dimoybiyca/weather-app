import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DETAILS_LIST } from 'app/main/constants/details-list';
import { TWeatherData } from 'app/main/types/weather-data.type';
import { TDetailsItem } from 'app/main/types/details-item.type';
import { IconComponent } from 'app/shared/components/icon/icon.component';
import { NumberAnimationDirective } from 'app/shared/directives/number-animation.directive';

@Component({
  selector: 'wa-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, NumberAnimationDirective],
})
export class WeatherDetailsComponent {
  weatherData = input.required<TWeatherData | null>();
  detailsList = DETAILS_LIST;

  getDetailValue(detail: TDetailsItem): number {
    const value = this.weatherData()?.[detail.field];
    if (typeof value === 'number') {
      return value;
    } else if (typeof value === 'string') {
      return parseInt(value, 10);
    }

    return 0;
  }
}
