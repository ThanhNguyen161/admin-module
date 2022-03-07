import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, map, Observable, of, tap } from 'rxjs';
import { USER_INFO_KEY } from '../../constant';
import { LoginRequestModel, UserViewModel } from '../../models';
import { userActions, userSelectors } from '../../store';
import { IAuthService } from './auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private store: Store) {}

  login(request: LoginRequestModel): Observable<boolean> {
    return this.store
      .select(
        userSelectors.getByUsernameAndPassword(
          request.username,
          request.password
        )
      )
      .pipe(
        tap(() =>
          this.store.dispatch(userActions.setLoading({ isLoading: true }))
        ),
        delay(1000),
        tap(() =>
          this.store.dispatch(userActions.setLoading({ isLoading: false }))
        ),
        map((user) => {
          if (user) sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
          else sessionStorage.removeItem(USER_INFO_KEY);

          return !!user;
        })
      );
  }

  getLoginUser(): UserViewModel {
    const user = sessionStorage.getItem(USER_INFO_KEY);
    return user ? JSON.parse(user) : null;
  }

  logOut() {
    sessionStorage.removeItem(USER_INFO_KEY);
  }

  get isLogged() {
    return !!this.getLoginUser();
  }
}
