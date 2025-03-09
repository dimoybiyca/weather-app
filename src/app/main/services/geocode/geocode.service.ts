import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CachedHttpClient } from 'app/core/http/cached-http-client/cached-http-client';
import { TCoordinates } from 'app/shared/types/coordinates.type';
import { TOption } from 'app/shared/types/option.type';
import { environment } from 'environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  private readonly API_URL = environment.API_URL + '/geo/1.0/direct';
  private readonly API_KEY = environment.API_KEY;

  cityPredictions: WritableSignal<TOption<TCoordinates>[]> = signal([]);

  private http: CachedHttpClient = inject(CachedHttpClient);

  fetchPredictions(params: { q: string; limit: number }): void {
    this.http
      .cachedGet<any>(this.API_URL, {
        params: { ...params, ...this.commonParams },
      })
      .pipe(
        map((res) =>
          res.map((item: any) => ({
            title: item.name,
            value: { lat: item.lat, lon: item.lon },
          })),
        ),
      )
      .subscribe((res) => {
        this.cityPredictions.set(res);
      });
  }

  clearPredictions(): void {
    this.cityPredictions.set([]);
  }

  private get commonParams(): Record<string, string> {
    return {
      appid: this.API_KEY,
    };
  }
}
