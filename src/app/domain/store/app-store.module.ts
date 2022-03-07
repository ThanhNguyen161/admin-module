import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { usersReducer } from './user/user.reducer';

@NgModule({
    imports: [
        StoreModule.forRoot({
          users: usersReducer,
        }),
        StoreDevtoolsModule.instrument({
          maxAge: 15,
          autoPause: true
        })
    ]
})
export class AppStoreModule {
    static forRoot(): ModuleWithProviders<AppStoreModule> {
        return {
          ngModule: AppStoreModule,
          providers: [  ]
        }
      }
    
}
