import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceOfferForm } from '@/app/employee-front/employee-service/shared/service-offer-form.util';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-service-offered-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
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
  templateUrl: './service-offered-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceOfferedFormComponent {
  form = input.required<FormGroup>();
  profile = input<boolean>(false);
  buttonLoading = input.required<boolean>();

  readonly formEmitter = output<ServiceOfferForm>();

  private readonly buildForm = () => {
    const name = this.form().controls['name'].value;
    const price = this.form().controls['price'].value;
    const visible = this.form().controls['visible'].value;
    const duration = this.form().controls['duration'].value;
    const cleanUp = this.form().controls['cleanUp'].value;

    return {
      name: name ? name : '',
      price: price ? price : 0,
      visible: !!visible,
      duration: duration ? duration : 0,
      cleanUp: cleanUp ? cleanUp : 0,
    } as ServiceOfferForm;
  };

  protected readonly submit = () => this.formEmitter.emit(this.buildForm());
}
