import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared.module';
import { BaseLayoutComponent } from './base-layout.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    NavBarComponent,
    FooterComponent,
    BodyComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [BaseLayoutComponent],
})
export class BaseLayoutModule {}
