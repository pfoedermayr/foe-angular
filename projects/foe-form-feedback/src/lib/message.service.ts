import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ErrorMessageService } from './error-message-service.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements ErrorMessageService {

  get(errors: ValidationErrors): Observable<string[]> {
    return of(
      Object.keys(errors).map(
        error => this.getError(error, errors[error])
      )
    );
  }

  private getError(error: string, data: any): string {
    switch (error) {
      case 'min':
        return `Value is too low (minimum ${data.min})`;

      case 'max':
        return `Value is too high (maximum ${data.max})`;

      case 'required':
        return 'Cannot be blank.';

      case 'email':
        return 'Invalid e-mail adress.';

      case 'minlength':
        return `Text is too short (minimum ${data.requiredLength} characters)`;

      case 'maxlength':
      return `Text is too long (maximum ${data.requiredLength} characters)`;

      case 'pattern':
        return 'Value is not valid.';

      default:
        console.warn('Unknown validator. Please provide your own MessageService.'); // TODO: Link to docs
        return '';
    }
  }
}
