import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {
  APP_ROLE,
  AUTH_SERVICE_TOKEN,
  focusElement,
  IAuthService,
  IUserService,
  UserViewModel,
  USER_SERVICE_TOKEN,
} from 'src/app/domain';
import { BaseSubscribeComponent } from '../../shared';
import { UserDetailComponent } from './user-detail/user-detail.component';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss'],
})
export class UserSettingComponent extends BaseSubscribeComponent {
  @ViewChild('userDetail', { read: ElementRef }) userDetail: ElementRef<HTMLElement>;

  dataListing: UserViewModel[];
  selectedUser: UserViewModel | null;
  isViewOnly = true;

  loginUser: UserViewModel;

  constructor(
    @Inject(USER_SERVICE_TOKEN) private userService: IUserService,
    @Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService
  ) {
    super();
    this.loginUser = this.authService.getLoginUser();
  }

  protected override onInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.addSubscription(
      this.userService.getAll().subscribe((res) => {
        this.dataListing = res;
      })
    );
  }

  afterSave(isNeedReload: boolean) {
    if (isNeedReload) {
      // this.getAllUsers();
    }
    this.selectedUser = null;
  }

  onEditItem(selectedItem: UserViewModel) {
    this.selectedUser = { ...selectedItem };
    this.isViewOnly = false;
    this.focusDetail();
  }

  onViewItem(selectedItem: UserViewModel) {
    this.selectedUser = { ...selectedItem };
    this.isViewOnly = true;
    this.focusDetail();
  }

  onDeleteItem(selectedItem: UserViewModel) {
    if (confirm('Are you sure to delete?')) {
      this.addSubscription(
        this.userService.deleteById(selectedItem.id).subscribe((res) => {
          alert('Delete Success!!');
        })
      );
    }
  }

  onAddNew() {
    this.selectedUser = new UserViewModel();
    this.isViewOnly = false;
    this.focusDetail();
  }

  isShowAction(button: string, user: UserViewModel) {
    switch (button) {
      case 'edit':
        return (
          this.loginUser.role === APP_ROLE.ADMIN ||
          this.loginUser.username === user.username ||
          user.role === APP_ROLE.USER
        );
      case 'view':
        return (
          user.role !== APP_ROLE.USER &&
          this.loginUser.role === APP_ROLE.MODERATOR &&
          this.loginUser.username !== user.username
        );
      case 'delete':
        return (
          this.loginUser.role === APP_ROLE.ADMIN || user.role === APP_ROLE.USER
        );
    }

    return false;
  }

  focusDetail() {
    setTimeout(() => {
      focusElement(this.userDetail as ElementRef<HTMLElement>);
    }, 200);
    
  }
}
