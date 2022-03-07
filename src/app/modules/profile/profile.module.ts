import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService, USER_SERVICE_TOKEN } from 'src/app/domain';
import { SharedModule } from '../shared';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
  ],
})
export class ProfileModule {}
