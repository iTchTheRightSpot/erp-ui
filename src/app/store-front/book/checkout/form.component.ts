import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckoutDto } from '@/app/store-front/book/checkout/checkout.dto';
import { NgClass } from '@angular/common';
import { ApiStatus } from '@/app/app.util';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  styleUrl: '../../../shared-components/number-input.component.css',
  templateUrl: 'form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  protected readonly ApiStatus = ApiStatus;

  form = input.required<FormGroup>();
  staffId = input.required<string>();
  services = input.required<{ service_name: string }[]>();
  epochSeconds = input.required<number>();
  buttonLoading = input.required<ApiStatus>();
  readonly formEmitter = output<FormData>();

  protected readonly provinces = [
    { abbreviation: 'AB', country: 'Alberta' },
    { abbreviation: 'BC', country: 'British Columbia' },
    { abbreviation: 'ON', country: 'Ontario' },
    { abbreviation: 'MB', country: 'Manitoba' },
    { abbreviation: 'NL', country: 'Newfoundland and Labrador' },
    { abbreviation: 'QC', country: 'Quebec' },
    { abbreviation: 'NB', country: 'New Brunswick' },
    { abbreviation: 'NS', country: 'Nova Scotia' },
    { abbreviation: 'SK', country: 'Saskatchewan' }
  ];

  private readonly buildForm = () => {
    const form = this.form();
    const name = form.controls['name'].value;
    const email = form.controls['email'].value;
    const phone = form.controls['phone'].value;
    const address = form.controls['address'].value;
    const city = form.controls['city'].value;
    const postcode = form.controls['postcode'].value;
    const province = form.controls['province'].value;
    const description = form.controls['description'].value;

    return {
      name: name ? name : '',
      email: email ? email : '',
      phone: phone ? phone : '',
      address: address ? address : '',
      city: city ? city : '',
      province: province ? province : '',
      postcode: postcode ? postcode : '',
      country: 'Canada',
      description: description ? description : ''
    };
  };

  private file: File | null = null;

  protected readonly onFileSelected = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files) return;
    this.file = files.item(0);
  };

  protected readonly submit = (epochSeconds: number) => {
    const builder = this.buildForm();

    const dto: CheckoutDto = {
      services: this.services(),
      name: builder.name,
      employee_id: this.staffId(),
      start: epochSeconds,
      email: builder.email,
      phone: builder.phone,
      description: builder.description,
      address: `${builder.address}, ${builder.city}, ${builder.province} ${builder.postcode}, ${builder.country}`
    };

    const data = new FormData();
    data.append(
      'dto',
      new Blob([JSON.stringify(dto)], { type: 'application/json' })
    );

    if (this.file !== null) data.append('files', this.file);

    this.formEmitter.emit(data);
  };
}
