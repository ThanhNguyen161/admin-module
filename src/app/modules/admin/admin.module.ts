import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '..';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { RoleSettingComponent } from './role-setting/role-setting.component';
import { UserService, USER_SERVICE_TOKEN } from 'src/app/domain';
import { UserDetailComponent } from './user-setting/user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    UserSettingComponent,
    RoleSettingComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
  ],
})
export class AdminModule {}
