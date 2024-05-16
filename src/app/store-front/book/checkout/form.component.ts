import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  styles: [
    `
      /* Chrome, Safari, Edge, Opera */
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      input[type='number'] {
        -moz-appearance: textfield;
      }
    `,
  ],
  template: `
    <div>
      <h2
        class="mb-4 underline underline-offset-4 decoration-1 font-medium text-base lg:text-lg"
      >
        Contact Information
      </h2>
      <form class="space-y-8">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium"
            >Full name <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            id="name"
            class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300"
            placeholder="full name"
            required
          />
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium"
            >Email <span class="text-red-500">*</span></label
          >
          <input
            type="email"
            id="email"
            class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300"
            placeholder="email"
            required
          />
        </div>
        <div>
          <label for="name" class="block mb-2 text-sm font-medium"
            >Phone <span class="text-red-500">*</span></label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 19 18"
              >
                <path
                  d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"
                />
              </svg>
            </div>
            <input
              type="number"
              id="phone-input"
              aria-describedby="helper-text-explanation"
              class="block w-full ps-10 p-3 text-sm rounded-md bg-gray-50 border border-gray-300 text-gray-900"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="phone"
              required
            />
          </div>
        </div>

        <div class="my-3">
          <h2
            class="font-medium underline underline-offset-4 decoration-1 text-base lg:text-lg"
          >
            Landscape Information
          </h2>
        </div>

        <div>
          <label for="address" class="block mb-2 text-sm font-medium"
            >Address <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            id="address"
            class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300"
            placeholder="address"
            required
          />
        </div>

        <div>
          <label for="city" class="block mb-2 text-sm font-medium"
            >City <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            id="city"
            class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300"
            placeholder="city"
            required
          />
        </div>

        <div>
          <label for="province" class="block mb-2 text-sm font-medium"
            >Province <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            id="province"
            class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300"
            placeholder="province"
            required
          />
        </div>

        <div>
          <label for="postcode" class="block mb-2 text-sm font-medium"
            >Postcode <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            id="postcode"
            class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300"
            placeholder="postcode"
            required
          />
        </div>

        <div>
          <label for="country" class="block mb-2 text-sm font-medium"
            >Country <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            id="country"
            class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300"
            placeholder="country"
            required
          />
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium" for="multiple_files"
            >Upload an image of the job site</label
          >
          <input
            class="block w-full p-3 text-sm cursor-pointer text-gray-900 bg-gray-50 rounded-md border border-gray-300"
            id="multiple_files"
            type="file"
            accept="image/*"
          />
        </div>

        <div class="sm:col-span-2">
          <label for="detail" class="block mb-2 text-sm font-medium"
            >Detail <span class="text-red-500">*</span></label
          >
          <textarea
            id="detail"
            rows="6"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md shadow-sm border border-gray-300"
            placeholder="Please enter a brief description about the job area"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          class="py-3 px-5 text-sm font-medium text-center text-white rounded-md sm:w-fit bg-[var(--app-theme)]"
        >
          Confirm booking
        </button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {}
