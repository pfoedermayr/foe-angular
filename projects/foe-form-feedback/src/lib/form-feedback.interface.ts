import { ValidationErrors } from '@angular/forms';

export interface FormFeedback {
  updateStatus(status: string, errors: ValidationErrors | null): void;
}
