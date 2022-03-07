import { UserState } from "./user/user.selector";

export interface AppState {
  users: Readonly<UserState>;
}
