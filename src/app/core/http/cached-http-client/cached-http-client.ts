import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  TRequestOptions,
  TRequestParams,
} from 'app/core/http/get-options.type';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CachedHttpClient extends HttpClient {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheDuration = 10 * 60 * 1000; // 10 хвилин

  constructor(handler: HttpHandler) {
    super(handler);
  }

  cachedGet<T>(url: string, options?: TRequestOptions): Observable<T> {
    const now = Date.now();

    // Create cache key using URL + serialized params
    const cacheKey = options?.params
      ? this.urlWithParams(url, options.params)
      : url;

    const cached = this.cache.get(cacheKey);

    // Check if cached data is available and not expired
    if (cached && now - cached.timestamp < this.cacheDuration) {
      return of(cached.data as T); // Return cached data
    }

    return super.get<T>(url, { ...options, observe: 'body' }).pipe(
      tap((data: T) => this.cache.set(cacheKey, { data, timestamp: now })), // Cache response
    );
  }

  private urlWithParams(url: string, params: TRequestParams): string {
    let serializedParams = '';

    if (params instanceof HttpParams) {
      serializedParams = params.toString();
    } else {
      serializedParams = new HttpParams({ fromObject: params }).toString();
    }

    return `${url}?${serializedParams}`;
  }
}
