import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStoreModule, AUTH_SERVICE_TOKEN, AuthService } from './domain';
import { PageLoadingComponent } from './modules/shared';

@NgModule({
  declarations: [AppComponent, PageLoadingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    AppStoreModule.forRoot(),
  ],
  providers: [
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
