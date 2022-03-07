import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  APP_ROLE,
  AUTH_SERVICE_TOKEN,
  FormHelper,
  GuidHelper,
  IAuthService,
  IUserService,
  UserViewModel,
  USER_SERVICE_TOKEN,
} from 'src/app/domain';
import { BaseSubscribeComponent } from 'src/app/modules/shared';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent
  extends BaseSubscribeComponent
  implements OnChanges
{
  @Input() selectedUser: UserViewModel;
  @Input() isViewOnly = true;
  @Output() afterSave = new EventEmitter<boolean>();

  isEdit = false;

  formGroup: FormGroup;
  loginUser: UserViewModel;

  listRoles = [APP_ROLE.ADMIN, APP_ROLE.MODERATOR, APP_ROLE.USER];
  listRoleSelections: string[] = [];
  isSelectRoleDisabled = true;
  constructor(
    private fb: FormBuilder,
    @Inject(USER_SERVICE_TOKEN) private userService: IUserService,
    @Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService
  ) {
    super();
    this.loginUser = this.authService.getLoginUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['selectedUser']) {
        this.initForm();
      }

      this.setFormBasedOnRole();
    }
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

    this.patchFormValue();
  }

  patchFormValue() {
    this.isEdit = !!this.selectedUser.id;
    const userId = this.selectedUser.id || GuidHelper.newGuid();
    this.formGroup.patchValue({
      ...this.selectedUser,
      id: userId,
    });
  }

  setFormBasedOnRole() {
    if (this.loginUser.role === APP_ROLE.MODERATOR && !this.isViewOnly) {
      this.listRoleSelections = [...this.listRoles].splice(2);
    }

    this.isSelectRoleDisabled =
      this.isViewOnly ||
      (this.loginUser.role === APP_ROLE.MODERATOR &&
        this.selectedUser.role !== APP_ROLE.USER &&
        this.isEdit);
  }

  onSave() {
    if (this.formGroup.valid) {
      const userValue = this.formGroup.getRawValue() as UserViewModel;
      const obser = this.isEdit
        ? this.userService.updateUser(userValue)
        : this.userService.addUser(userValue);

      this.addSubscription(
        obser.subscribe((res) => {
          this.afterSave.emit(true);
        })
      );
    } else {
      FormHelper.markFormAsTouchAndDirty(this.formGroup);
    }

    this.formGroup.controls['email'].errors;
  }

  onCancel() {
    this.afterSave.emit(false);
  }
}
