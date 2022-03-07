import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, map, Observable, of, take, tap } from 'rxjs';
import { IUserService } from '..';
import { UserViewModel } from '../../models';
import { userActions, userSelectors } from '../../store';

@Injectable()
export class UserService implements IUserService {
  constructor(private store: Store) {}

  getAll(): Observable<UserViewModel[]> {
    return this.store.select(userSelectors.getAll()).pipe(
      tap(() =>
        this.store.dispatch(userActions.setLoading({ isLoading: true }))
      ),
      delay(1000),
      tap(() =>
        this.store.dispatch(userActions.setLoading({ isLoading: false }))
      )
    );
  }

  getById(userId: string): Observable<UserViewModel> {
    return this.store.select(userSelectors.getById(userId)).pipe(
      tap(() =>
        this.store.dispatch(userActions.setLoading({ isLoading: true }))
      ),
      delay(1000),
      tap(() =>
        this.store.dispatch(userActions.setLoading({ isLoading: false }))
      ),
      map((res) => {
        return res as UserViewModel;
      })
    );
  }

  addUser(user: UserViewModel): Observable<boolean> {
    return this.store.select(userSelectors.getById(user.id)).pipe(
      take(1),
      tap(() =>
        this.store.dispatch(userActions.setLoading({ isLoading: true }))
      ),
      delay(1000),
      tap(() =>
        this.store.dispatch(userActions.setLoading({ isLoading: false }))
      ),
      map((res) => !res),
      tap((isValid) => {
        if (isValid) {
          this.store.dispatch(userActions.addUser({ user }));
        }
      })
    );
  }

  updateUser(user: UserViewModel): Observable<boolean> {
    return this.store.select(userSelectors.getById(user.id)).pipe(
      take(1),
      tap(() =>
        this.store.dispatch(userActions.setLoading({ isLoading: true }))
      ),
      delay(1000),
      tap(() =>
        this.store.dispatch(userActions.setLoading({ isLoading: false }))
      ),
      map((res) => !!res),
      tap((isValid) => {
        if (isValid) {
          this.store.dispatch(userActions.updateUser({ user }));
        }
      })
    );
  }

  deleteById(userId: string): Observable<boolean> {
    return this.store.select(userSelectors.getById(userId)).pipe(
      take(1),
      tap(() =>
        this.store.dispatch(userActions.setLoading({ isLoading: true }))
      ),
      delay(1000),
      tap(() =>
        this.store.dispatch(userActions.setLoading({ isLoading: false }))
      ),
      map((res) => !!res),
      tap((isValid) => {
        if (isValid) {
          this.store.dispatch(userActions.removeUser({ userId }));
        }
      })
    );
  }
}
