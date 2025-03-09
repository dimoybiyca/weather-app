import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { fade } from 'animation/fade.animation';
import { CityInputComponent } from 'app/main/components/city-input/city-input.component';
import { WeatherDetailsComponent } from 'app/main/components/weather-details/weather-details.component';
import { WeatherForecastComponent } from 'app/main/components/weather-forecast/weather-forecast.component';
import { WeatherService } from 'app/main/services/weather/weather.service';
import { TForecastData } from 'app/main/types/forecast-data.type';
import { TWeatherData } from 'app/main/types/weather-data.type';
import { IconComponent } from 'app/shared/components/icon/icon.component';

@Component({
  selector: 'wa-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fade],
  imports: [
    CityInputComponent,
    WeatherDetailsComponent,
    WeatherForecastComponent,
    IconComponent,
  ],
})
export class SidebarComponent {
  private weatherService: WeatherService = inject(WeatherService);

  get data(): TWeatherData | null {
    return this.weatherService.weather();
  }

  get forecast(): TForecastData[] {
    return this.weatherService.forecast();
  }
}
