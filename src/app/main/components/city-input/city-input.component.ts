import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from 'app/core/base/component';
import { GeocodeService } from 'app/main/services/geocode/geocode.service';
import { WeatherService } from 'app/main/services/weather/weather.service';
import { AutocompleteComponent } from 'app/shared/components/autocomplete/autocomplete.component';
import { IconComponent } from 'app/shared/components/icon/icon.component';
import { TCoordinates } from 'app/shared/types/coordinates.type';
import { TOption } from 'app/shared/types/option.type';
import { filter, takeUntil } from 'rxjs';

@Component({
  selector: 'wa-city-input',
  templateUrl: './city-input.component.html',
  styleUrl: './city-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AutocompleteComponent, IconComponent, ReactiveFormsModule],
})
export class CityInputComponent extends BaseComponent implements OnInit {
  limit: InputSignal<number> = input(5);

  citySelected: OutputEmitterRef<TCoordinates> = output();

  weatherService: WeatherService = inject(WeatherService);
  geocodeService: GeocodeService = inject(GeocodeService);
  formControl: FormControl<TOption<TCoordinates> | null> = new FormControl(
    null,
  );

  get predictions(): TOption<TCoordinates>[] {
    return this.geocodeService.cityPredictions();
  }

  constructor() {
    super();
    afterNextRender(() => {
      this.weatherService.fetchLatestLocation();
    });
  }

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this.$componentDestroyed), filter(Boolean))
      .subscribe((value) => {
        this.weatherService.fetchWeather({
          lat: value?.value.lat ?? 0,
          lon: value?.value.lon ?? 0,
        });
      });
  }

  onSearch(searchTerm: string | null): void {
    if (searchTerm) {
      this.geocodeService.fetchPredictions({
        q: searchTerm,
        limit: this.limit(),
      });
    } else {
      this.geocodeService.clearPredictions();
    }
  }
}
