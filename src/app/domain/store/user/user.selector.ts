import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserViewModel } from '../../models';

export interface UserState {
  users: UserViewModel[];
  isLoading: boolean;
}

const getUserState = createFeatureSelector<Readonly<UserState>>('users');

const getState = () =>
  createSelector(getUserState, (state: UserState) => state);
const getAll = () =>
  createSelector(getUserState, (state: UserState) => state.users);

const getById = (userId: string) =>
  createSelector(getUserState, (state: UserState) =>
    state.users.find((x) => x.id === userId)
  );

const getByUsernameAndPassword = (username: string, password: string) =>
  createSelector(getUserState, (state: UserState) => 
    state.users.find((x) => x.username === username && x.password === password)
  );

const getLoading = () =>
  createSelector(getUserState, (state: UserState) => state.isLoading);

export const userSelectors = {
  getState,
  getAll,
  getById,
  getLoading,
  getByUsernameAndPassword
};
