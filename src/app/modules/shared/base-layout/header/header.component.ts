import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AUTH_SERVICE_TOKEN,
  IAuthService,
  IUserService,
  UserService,
  UserViewModel,
  USER_SERVICE_TOKEN,
} from 'src/app/domain';
import { BaseSubscribeComponent } from '../../base-component/base-subscribe.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
  ],
})
export class HeaderComponent extends BaseSubscribeComponent {
  sideBarCollapsed = true;
  loggedUser: UserViewModel;
  defaultAvatar = '/assets/images/default-avatar.svg';
  avatarUrl: string;
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService,
    @Inject(USER_SERVICE_TOKEN) private userService: IUserService,
    private router: Router,
    private ativatedRoute: ActivatedRoute
  ) {
    super();
    this.loggedUser = { ...this.authService.getLoginUser() };
  }

  protected override onInit(): void {
    this.fetchUserInfo();
    this.addSubscription(this.ativatedRoute.paramMap.subscribe(param => {
      console.log('paramMap', param);
    }))
  }

  fetchUserInfo() {
    this.addSubscription(
      this.userService.getById(this.loggedUser.id).subscribe((res) => {
        this.loggedUser = { ...res };
        this.avatarUrl = this.loggedUser.avatarUrl || this.defaultAvatar;
      })
    );
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
