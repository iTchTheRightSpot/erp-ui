import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  styles: [
    `
      /* width */
      ::-webkit-scrollbar {
        height: 6px;
        width: 6px;
        margin-top: 10px;
      }
      /* Track */
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: black;
        cursor: pointer;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `
  ],
  template: `
    <nav class="text-black w-full" aria-label="pagination">
      @if (totalPages() < 6) {
        <ul class="list-style-none flex justify-center">
          <li class="flex gap-2 cursor-pointer">
            @for (num of range(); track num; let i = $index) {
              <button
                type="button"
                (click)="onGoTo(num)"
                [attr.data-page-number]="num"
                aria-label="button number"
                [style]="{
                  'background-color':
                    num === selectedPage ? 'var(--app-theme)' : ''
                }"
                class="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-gray-200"
              >
                {{ num + 1 }}
              </button>
            }
          </li>
        </ul>
      } @else {
        <div
          class="w-full flex gap-2.5 justify-center items-center list-style-none"
        >
          <div>
            <button
              (click)="onPrevious()"
              type="button"
              aria-label="Previous button"
              class="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-gray-200"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </div>

          <!-- number -->
          <ul class="slider flex overflow-x-auto scroll-smooth">
            @for (num of range(); track num; let i = $index) {
              <li class="mb-2">
                <button
                  type="button"
                  (click)="onGoTo(num)"
                  aria-label="button number"
                  [attr.data-page-number]="num"
                  [style]="{
                    'background-color':
                      num === selectedPage ? 'var(--app-theme)' : ''
                  }"
                  class="relative cursor-pointer block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-gray-200"
                >
                  {{ num + 1 }}
                </button>
              </li>
            }
          </ul>

          <!-- next -->
          <div>
            <button
              (click)="onNext()"
              type="button"
              aria-label="Next button"
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-gray-200 hover:rounded-full"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </div>
        </div>
      }
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  private readonly render = inject(Renderer2);
  protected selectedPage = 0;

  currentPage = input.required<number>();
  totalPages = input.required<number>();

  readonly goTo = output<number>();

  /**
   * Displays from 0 to the total number of items (totalPages)
   * passed by the parent component
   * */
  range = (): number[] => [...Array(this.totalPages()).keys()];

  /**
   * Informs parent component on what page number was clicked
   * */
  protected readonly onGoTo = (page: number) => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    this.selectedPage = page;
    this.goTo.emit(page);
  };

  /**
   * Displays previous numbers
   * */
  protected readonly onPrevious = () => {
    const container = this.render.selectRootElement('.slider', true);
    let dimension = container.getBoundingClientRect();
    let width = dimension.width;
    container.scrollLeft -= width;
  };

  /**
   * Displays next numbers
   * */
  protected readonly onNext = () => {
    const container = this.render.selectRootElement('.slider', true);
    let dimension = container.getBoundingClientRect();
    container.scrollLeft += dimension.width;
  };
}
