import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CsrfService {
  private readonly domain: string | undefined = environment.domain;
  private readonly http = inject(HttpClient);

  // readonly csrf = () => of({ token: 'token', parameterName: 'name', headerName: 'header' });

  readonly csrf = () =>
    this.http.get<{ token: string; parameterName: string; headerName: string }>(
      `${this.domain}csrf`,
      { withCredentials: true },
    );
}
