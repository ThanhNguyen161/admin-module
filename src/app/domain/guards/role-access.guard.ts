import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AUTH_SERVICE_TOKEN } from '../constant';
import { IAuthService } from '../services';

@Injectable()
export class RoleAccessGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const loginUser = this.authService.getLoginUser();

    let allowRoles = route.data['allowRoles'] as Array<string>;

    const isAllow =
      loginUser && (!allowRoles || allowRoles.includes(loginUser.role));

    if (!isAllow) this.router.navigate(['/']);

    return isAllow;
  }
}
