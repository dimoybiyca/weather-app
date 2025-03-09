import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { TWeatherData } from 'app/main/types/weather-data.type';
import { BackgroundTransitionDirective } from 'app/shared/directives/background-transition.directive';

@Component({
  selector: 'wa-background',
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BackgroundTransitionDirective],
})
export class BackgroundComponent {
  weatherData: InputSignal<TWeatherData | null> = input.required();
}
