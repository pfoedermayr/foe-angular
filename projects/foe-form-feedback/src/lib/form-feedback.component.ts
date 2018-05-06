import { ChangeDetectionStrategy, Component, HostBinding, ChangeDetectorRef } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { FormFeedback } from './form-feedback.interface';

@Component({
  selector: 'foe-form-feedback',
  templateUrl: 'form-feedback.component.html',
  styleUrls: ['form-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFeedbackComponent implements FormFeedback {
  @HostBinding('class.form-feedback-invalid')
  invalid = false;

  errors: ValidationErrors | null = null;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  updateStatus(status: string, errors: ValidationErrors | null) {
    this.invalid = status === 'INVALID';

    if (this.invalid) {
      this.errors = errors;
      // TODO: Get proper messages based on the error
    }
    this.cdr.markForCheck();
  }
}
