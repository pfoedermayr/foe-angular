import { CommonModule } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, NgModule, Type } from '@angular/core';

import { FormFeedbackComponent } from './form-feedback.component';
import { FormFeedbackDirective } from './form-feedback.directive';
import { FormFeedback } from './form-feedback.interface';
import { MessageService } from './message.service';
import { TOKEN } from './token';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FormFeedbackComponent, FormFeedbackDirective],
  exports: [FormFeedbackDirective],
  entryComponents: [FormFeedbackComponent]
})
export class FormFeedbackModule {
  static withCustomFeedback(component: Type<FormFeedback>): ModuleWithProviders {
    return {
      ngModule: FormFeedbackModule,
      providers: [
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true },
        { provide: TOKEN, useValue: component }
      ]
    };
  }

  static withCustomMessageService(service: Type<MessageService>): ModuleWithProviders {
    return {
      ngModule: FormFeedbackModule,
      providers: [
        { provide: MessageService, useClass: service, multi: true }
      ]
    };
  }
}
