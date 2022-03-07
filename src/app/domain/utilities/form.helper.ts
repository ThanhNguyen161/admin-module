import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormHelper {
  static markFormAsTouchAndDirty(formGroup: FormGroup) {
    this.markAllFieldAsTouch(formGroup);
    this.markAllFieldDirty(formGroup);
  }

  static markAllFieldAsTouch(formGroup: FormGroup) {
    formGroup.markAllAsTouched();
  }
  static markAllFieldDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormArray) {
        control.controls.forEach((form) =>
          this.markAllFieldDirty(form as FormGroup)
        );
      } else if (control instanceof FormGroup) {
        this.markAllFieldDirty(control);
      }
    });
  }
}
