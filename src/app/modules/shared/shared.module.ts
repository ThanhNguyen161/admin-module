import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DisableControlDirective, RoleDisplayDirective, ValidateControlDirective } from 'src/app/domain';

@NgModule({
  declarations: [ValidateControlDirective, RoleDisplayDirective, DisableControlDirective],
  imports: [NgbModule, NgSelectModule],
  exports: [
    NgbModule,
    NgSelectModule,
    ValidateControlDirective,
    RoleDisplayDirective,
    DisableControlDirective
  ],
})
export class SharedModule {}
