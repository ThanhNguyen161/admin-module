import { createReducer, on } from '@ngrx/store';
import { userActions } from './user.actions';

import { UserState } from './user.selector';

const initialState: UserState = {
  users: [
    {
      id: '225455b9-4349-4dd2-8c82-7fc11ff67b9e',
      username: 'admin',
      password: '123',
      firstName: 'Admin',
      lastName: '01',
      email: 'admin@example',
      role: 'Admin',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg'
    },
    {
      id: '608680c8-8e1c-4e2b-bb4e-67841d5a3e32',
      username: 'moderator',
      password: '123',
      firstName: 'Mod',
      lastName: '01',
      email: 'mod@example',
      role: 'Moderator',
    },
    {
      id: '3bb8045d-d83c-4390-9d1f-d4f2b4ddea82',
      username: 'user',
      password: '123',
      firstName: 'User',
      lastName: '01',
      email: 'user@example',
      role: 'User',
    },
  ],
  isLoading: false,
};

export const usersReducer = createReducer(
  initialState,
  on(userActions.addUser, (state, { user }) => {
    if (state.users.find((x) => x.username === user.username)) return state;

    const users = [...state.users, user];

    return {
      ...state,
      users,
    };
  }),
  on(userActions.updateUser, (state, { user }) => {
    const users = [...state.users];
    const userIndex = users.findIndex((x) => x.id === user.id);

    if (userIndex === -1) return state;

    if (users.some((x) => x.username === user.username && x.id !== user.id))
      return state;

    users.splice(userIndex, 1, user);

    return {
      ...state,
      users,
    };
  }),
  on(userActions.removeUser, (state, { userId }) => {
    const users = state.users.filter((x) => x.id !== userId);
    return {
      ...state,
      users,
    };
  }),
  on(userActions.setLoading, (state, { isLoading }) => {
    return {
      ...state,
      isLoading,
    };
  })
);
