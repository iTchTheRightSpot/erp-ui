import { Injectable, signal } from '@angular/core';
import { BookDto } from '@/app/store-front/book/book.util';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  readonly sig = signal<BookDto | undefined>(undefined);
}
