import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AUTH_SERVICE_TOKEN,
  IAuthService,
  LoginRequestModel,
} from 'src/app/domain';
import { BaseSubscribeComponent } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseSubscribeComponent {
  formGroup: FormGroup;

  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    super();
  }

  protected override onInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) return;

    const formData = this.formGroup.getRawValue() as LoginRequestModel;

    this.addSubscription(
      this.authService.login(formData).subscribe((res) => {
        if (res) {
          this.router.navigate(['home']);
        } else {
          alert('Invalid Username or Password');
        }
      })
    );
  }
}
