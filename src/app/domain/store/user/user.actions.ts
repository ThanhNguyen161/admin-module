import { createAction, props } from '@ngrx/store';

import { UserViewModel } from '../../models';
import { userActionKeys } from '../action-key.constant';

 const addUser = createAction(
  userActionKeys.add,
  props<{ user: UserViewModel }>()
);

 const updateUser = createAction(
  userActionKeys.update,
  props<{ user: UserViewModel }>()
);

 const removeUser = createAction(
  userActionKeys.remove,
  props<{ userId: string }>()
);

 const setLoading = createAction(
  userActionKeys.setLoading,
  props<{ isLoading: boolean }>()
)


export const userActions =  {
  addUser,
  updateUser,
  removeUser,
  setLoading
};