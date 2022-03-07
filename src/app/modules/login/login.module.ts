import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { USER_SERVICE_TOKEN, UserService } from 'src/app/domain';

import { SharedModule } from '../shared';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
  ],
})
export class LoginModule {}
