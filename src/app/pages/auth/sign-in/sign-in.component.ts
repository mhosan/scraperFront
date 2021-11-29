import { Component } from '@angular/core';
import { OptionsForm } from '@auth/form/form.component';
import { FormComponent } from '@auth/form/form.component';

@Component({
  selector: 'app-sign-in',
  template: `<app-form [options]="options"></app-form>`,
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {
  options: OptionsForm = {
    id: 'sign-in',
    label: 'Sign In',
  }
 
}
