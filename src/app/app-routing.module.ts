import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROLE, AuthGuard, RoleAccessGuard } from './domain';

import { BaseLayoutComponent, BaseLayoutModule } from './modules';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'admin',
        canActivate: [RoleAccessGuard],
        data: {
          allowRoles: [APP_ROLE.ADMIN, APP_ROLE.MODERATOR],
        },
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BaseLayoutModule],
  exports: [RouterModule],
  providers: [AuthGuard, RoleAccessGuard],
})
export class AppRoutingModule {}
