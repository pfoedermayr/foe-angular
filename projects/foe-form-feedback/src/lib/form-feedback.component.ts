import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

import { FormFeedback } from './form-feedback.interface';
import { MessageService } from './message.service';

@Component({
  selector: 'foe-form-feedback',
  templateUrl: 'form-feedback.component.html',
  styleUrls: ['form-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFeedbackComponent implements FormFeedback {
  @HostBinding('class.form-feedback-invalid')
  invalid = false;

  errors?: Observable<string[]>;

  constructor(
    private message: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  updateStatus(status: string, errors: ValidationErrors | null) {
    this.invalid = status === 'INVALID';

    if (this.invalid && errors != null) {
      this.errors = this.message.get(errors);
    } else {
      this.errors = undefined;
    }
    this.cdr.markForCheck();
  }
}
