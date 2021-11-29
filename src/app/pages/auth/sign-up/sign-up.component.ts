import { Component } from '@angular/core';
import { OptionsForm } from '@auth/form/form.component';

@Component({
  selector: 'app-sign-up',
  template: `<app-form [options]="options"></app-form>`,
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent  {
  options: OptionsForm = {
    id: 'sign-up',
    label: 'Sign up',
  }
  
}
