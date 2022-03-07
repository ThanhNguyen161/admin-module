import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  APP_ROLE,
  AUTH_SERVICE_TOKEN,
  FormHelper,
  IAuthService,
  IUserService,
  UserViewModel,
  USER_SERVICE_TOKEN,
} from 'src/app/domain';
import { BaseSubscribeComponent } from '../shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseSubscribeComponent {
  formGroup: FormGroup;
  loginUser: UserViewModel;
  listRoleSelections = [APP_ROLE.ADMIN, APP_ROLE.MODERATOR, APP_ROLE.USER];
  constructor(
    private fb: FormBuilder,
    @Inject(USER_SERVICE_TOKEN) private userService: IUserService,
    @Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService,
    private router: Router
  ) {
    super();
    this.loginUser = this.authService.getLoginUser();
  }

  protected override onInit(): void {
    this.initForm();
    this.fetchUserInfo();
  }

  initForm() {
    this.formGroup = this.fb.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      avatarUrl: [''],
      role: [null, Validators.required],
    });

  }

  fetchUserInfo() {
    this.addSubscription(
      this.userService.getById(this.loginUser.id).subscribe((res) => {
        this.loginUser = { ...res };
        this.patchFormValue();
      })
    );
  }

  patchFormValue() {
    this.formGroup.patchValue({
      ...this.loginUser,
    });
  }

  onSave() {
    if (this.formGroup.valid) {
      const userValue = this.formGroup.getRawValue() as UserViewModel;
      const obser = this.userService.updateUser(userValue);

      this.addSubscription(
        obser.subscribe((res) => {
          alert('Save Success');
        })
      );
    } else {
      FormHelper.markFormAsTouchAndDirty(this.formGroup);
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
