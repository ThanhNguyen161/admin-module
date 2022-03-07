import { Observable } from 'rxjs';
import { UserViewModel } from '../../models';

export interface IUserService {
  getAll(): Observable<UserViewModel[]>;
  getById(id: string): Observable<UserViewModel>;
  addUser(user: UserViewModel): Observable<boolean>;
  updateUser(user: UserViewModel): Observable<boolean>;
  deleteById(id: string): Observable<boolean>;
}
