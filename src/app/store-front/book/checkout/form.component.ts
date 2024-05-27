import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckoutDto } from '@/app/store-front/book/checkout/checkout.dto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  styleUrl: '../../../global-components/number-input.component.css',
  templateUrl: 'form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  private readonly fb = inject(FormBuilder);

  empEmail = input.required<string>();
  services = input.required<{ service_name: string }[]>();
  dateTime = input.required<Date>();
  buttonLoading = input.required<boolean>();
  readonly formEmitter = output<FormData>();

  protected readonly form = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.max(50)]),
    email: new FormControl('', [Validators.required, Validators.max(255)]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]{3}[0-9]{3}[0-9]{4}$'),
    ]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.max(255),
    ]),
  });

  protected readonly provinces = [
    { abbreviation: 'AB', country: 'Alberta' },
    { abbreviation: 'BC', country: 'British Columbia' },
    { abbreviation: 'ON', country: 'Ontario' },
    { abbreviation: 'MB', country: 'Manitoba' },
    { abbreviation: 'NL', country: 'Newfoundland and Labrador' },
    { abbreviation: 'QC', country: 'Quebec' },
    { abbreviation: 'NB', country: 'New Brunswick' },
    { abbreviation: 'NS', country: 'Nova Scotia' },
    { abbreviation: 'SK', country: 'Saskatchewan' },
  ];

  private readonly buildForm = () => {
    const name = this.form.controls['name'].value;
    const email = this.form.controls['email'].value;
    const phone = this.form.controls['phone'].value;
    const address = this.form.controls['address'].value;
    const city = this.form.controls['city'].value;
    const postcode = this.form.controls['postcode'].value;
    const province = this.form.controls['province'].value;
    const description = this.form.controls['description'].value;

    return {
      name: name ? name : '',
      email: email ? email : '',
      phone: phone ? phone : '',
      address: address ? address : '',
      city: city ? city : '',
      province: province ? province : '',
      postcode: postcode ? postcode : '',
      country: 'Canada',
      description: description ? description : '',
    };
  };

  private file: File | null = null;

  protected readonly onFileSelected = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files) return;
    this.file = files.item(0);
  };

  protected readonly submit = () => {
    const builder = this.buildForm();

    const dto: CheckoutDto = {
      services: this.services(),
      name: builder.name,
      employee_email: this.empEmail(),
      start: this.dateTime(),
      email: builder.email,
      phone: builder.phone,
      description: builder.description,
      address: `${builder.address}, ${builder.city}, ${builder.province} ${builder.postcode}, ${builder.country}`,
    };

    const data = new FormData();
    data.append(
      'dto',
      new Blob([JSON.stringify(dto)], { type: 'application/json' }),
    );
    data.append('files', this.file ? this.file : new Blob());

    this.formEmitter.emit(data);
  };
}
