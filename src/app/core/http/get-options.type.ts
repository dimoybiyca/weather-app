import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export type TRequestOptions = {
  headers?: HttpHeaders | Record<string, string | string[]>;
  context?: HttpContext;
  params?: TRequestParams;
  reportProgress?: boolean;
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
};

export type TRequestParams =
  | HttpParams
  | Record<
      string,
      string | number | boolean | ReadonlyArray<string | number | boolean>
    >;
