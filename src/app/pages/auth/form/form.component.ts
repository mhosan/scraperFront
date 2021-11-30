import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError, User, UserCredentials } from '@supabase/gotrue-js';
import { AuthService } from 'src/app/servicios/auth.service';
import { ACTIONS } from 'src/assets/constants/constant';

export interface OptionsForm {
  id: string;
  label: string;
}
interface UserResponse extends User, ApiError {
  error: boolean;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  signIn = ACTIONS.signIn;
  authForm !: FormGroup;  //el signo de exclamación es porque no se inicializa
  @Input() options !: OptionsForm;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authSvc: AuthService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    console.log(this.authForm.value);
    const credentials: UserCredentials = this.authForm.value;
    let actionToCall;

    if (this.options.id === ACTIONS.signIn) {
      actionToCall = this.authSvc.signIn(credentials);
    } else {
      actionToCall = this.authSvc.signUp(credentials);
    }

    try {
      const result = await actionToCall as UserResponse;
      if (result.email) {
        this.redirectUser();
      } else {
        //show notification
      }
    } catch (error) {
      console.log(error);
    }

  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private redirectUser(): void {
    this.router.navigate(['/home']);
  }

}
