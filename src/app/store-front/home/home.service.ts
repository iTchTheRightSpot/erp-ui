import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, delay, from, of, repeat, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly http = inject(HttpClient);

  private readonly images = [
    'assets/images/home/landscape-1.jpg',
    'assets/images/home/landscape-2.jpeg',
    'assets/images/home/landscape-3.jpg',
    'assets/images/home/landscape-4.jpg',
  ];

  readonly image$ = of(this.images).pipe(
    concatMap((photos: string[]) =>
      from(photos).pipe(
        concatMap((photo: string) => of(photo).pipe(delay(5000))),
        repeat(),
      ),
    ),
    startWith(this.images[0]),
  );
}
