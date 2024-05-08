import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CsrfService {
  private readonly domain: string | undefined = environment.domain;
  private readonly production: boolean | undefined = environment.production;

  private readonly http = inject(HttpClient);

  readonly csrf = (): Observable<{
    token: string;
    parameterName: string;
    headerName: string;
  }> =>
    of({
      token: 'token-1',
      parameterName: 'csrf',
      headerName: 'X-XSRF-TOKEN',
    });
}
