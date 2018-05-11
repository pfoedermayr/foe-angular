import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export interface ErrorMessageService {
  get(error: ValidationErrors): Observable<string[]>;
}
