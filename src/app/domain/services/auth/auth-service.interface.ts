import { Observable } from 'rxjs';
import { LoginRequestModel, UserViewModel } from '../../models';

export interface IAuthService {
  login(request: LoginRequestModel): Observable<boolean>;
  getLoginUser(): UserViewModel;
  logOut(): void;
  get isLogged(): boolean;
}
