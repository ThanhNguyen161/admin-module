import {
  AfterViewInit,
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disabled][formControlName]',
})
export class DisableControlDirective implements OnChanges {
  @Input() disabled = false;

  constructor(private ngControl: NgControl) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setControlDisable(this.disabled);
  }

  setControlDisable(value: boolean) {
    if (value) {
      this.ngControl.control?.disable();
    } else {
      this.ngControl.control?.enable();
    }
  }
}
