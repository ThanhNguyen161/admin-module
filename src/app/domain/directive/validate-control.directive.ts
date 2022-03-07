import { Directive, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[validateControl]',
})
export class ValidateControlDirective {
  constructor(private ngControl: NgControl) {}

  @HostBinding('class.is-invalid')
  public get isValid(): boolean {
    return (
      !!this.ngControl.invalid &&
      !!this.ngControl.touched &&
      !!this.ngControl.dirty
    );
  }
}
