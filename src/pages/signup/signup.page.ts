import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.page.html'
})
export class SignupPage {
  public submitted = false;
  public signupForm: FormGroup;

  // loginState$: any;
  private readonly CLASS_NAME = 'SignupPage';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);
    this.createForm();
  }

  onSignup() {
    console.log('onSignup:this.signupForm.value>', this.signupForm.value);
    this.submitted = true;
    const formModel = this.signupForm.value;

    if (this.signupForm.valid) {
      this.authService.doSignup(formModel.username, formModel.password);
    }
  }

  private createForm(): void {
    this.signupForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      username: ['', Validators.required],
    });
  }
}
