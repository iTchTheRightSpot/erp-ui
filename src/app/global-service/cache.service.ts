import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService<K, V> {
  private readonly mapSubject = new BehaviorSubject(new Map<K, V>());

  readonly keys$ = this.mapSubject
    .asObservable()
    .pipe(map((cache) => Array.from(cache.keys())));

  readonly values$ = this.mapSubject
    .asObservable()
    .pipe(map((cache) => Array.from(cache.values())));

  readonly getItem = (key: K) =>
    this.mapSubject.asObservable().pipe(map((cache) => cache.get(key)));

  readonly setItem = (key: K, value: V) =>
    this.mapSubject.next(this.mapSubject.getValue().set(key, value));

  readonly deleteItem = (key: K) => {
    const map = this.mapSubject.getValue();
    map.delete(key);
    this.mapSubject.next(map);
  };

  readonly clear = () => this.mapSubject.next(new Map<K, V>());
}
