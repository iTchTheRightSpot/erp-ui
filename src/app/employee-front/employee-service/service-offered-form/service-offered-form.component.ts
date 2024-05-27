import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceOfferForm } from '@/app/employee-front/employee-service/service-offered-form/service-offer-form.util';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-service-offered-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  styleUrl: '../../../global-components/number-input.component.css',
  templateUrl: './service-offered-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceOfferedFormComponent {
  form = input.required<FormGroup>();
  profile = input<boolean>(false);
  buttonLoading = input.required<boolean>();

  readonly submitEmitter = output<ServiceOfferForm>();
  readonly cancelEmitter = output<boolean>();

  private readonly buildForm = () => {
    const id = this.form().controls['serviceId'].value;
    const name = this.form().controls['name'].value;
    const price = this.form().controls['price'].value;
    const visible = this.form().controls['visible'].value;
    const duration = this.form().controls['duration'].value;
    const cleanUp = this.form().controls['cleanUp'].value;

    return {
      serviceId: id ? id : -1,
      name: name ? name : '',
      price: price ? price : 0,
      visible: !!visible,
      duration: duration ? duration : 0,
      cleanUp: cleanUp ? cleanUp : 0,
    } as ServiceOfferForm;
  };

  protected readonly cancel = () => this.cancelEmitter.emit(true);
  protected readonly submit = () => this.submitEmitter.emit(this.buildForm());
}
