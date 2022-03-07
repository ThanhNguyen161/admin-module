import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
} from '@angular/core';

import { AUTH_SERVICE_TOKEN } from '../constant';
import { IAuthService } from '../services';

@Directive({
  selector: '[roleDisplay]',
})
export class RoleDisplayDirective implements AfterViewInit {
  @Input() roleDisplay: string;
  @Input() isAllowAll: boolean = false;
  constructor(
    private ref: ElementRef<HTMLElement>,
    @Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService
  ) {}

  ngAfterViewInit(): void {
    if (this.isAllowAll) return;

    const rolesDisplay = this.roleDisplay ? this.roleDisplay.split(',') : [];

    const userRole = this.authService.getLoginUser()?.role;
    if (!rolesDisplay.includes(userRole)) {
      this.ref.nativeElement.style.display = 'none';
    }
  }
}
