import { Component, inject } from '@angular/core';
import { BackgroundComponent } from 'app/main/components/background/background.component';
import { SidebarComponent } from 'app/main/components/sidebar/sidebar.component';
import { WeatherDisplayComponent } from 'app/main/components/weather-display/weather-display.component';
import { GeocodeService } from 'app/main/services/geocode/geocode.service';
import { WeatherService } from 'app/main/services/weather/weather.service';
import { TWeatherData } from 'app/main/types/weather-data.type';
import { LogoComponent } from 'app/shared/components/logo/logo.component';

@Component({
  selector: 'wa-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  providers: [WeatherService, GeocodeService],
  imports: [
    BackgroundComponent,
    WeatherDisplayComponent,
    SidebarComponent,
    LogoComponent,
  ],
})
export class MainComponent {
  weatherService: WeatherService = inject(WeatherService);

  get data(): TWeatherData | null {
    return this.weatherService.weather();
  }
}
