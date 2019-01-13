import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormFeedbackComponent } from './form-feedback.component';
import { FormFeedback } from './form-feedback.interface';
import { TOKEN } from './token';

@Directive({
  selector: '[ngModel][foeFormFeedback],[formControl][foeFormFeedback],[formControlName][foeFormFeedback]'
})
export class FormFeedbackDirective implements OnInit, OnDestroy {
  private ref: ComponentRef<FormFeedback>;
  private statusChangesSubscription: Subscription;

  constructor(
    @Self() private formItem: NgControl,
    @Optional() @Inject(TOKEN) private customComponent: Type<FormFeedback>,
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    if (this.formItem.control == null) {
      return;
    }

    let factory;
    if (this.customComponent == null) {
      factory = this.cfr.resolveComponentFactory(FormFeedbackComponent);
    } else {
      factory = this.cfr.resolveComponentFactory(this.customComponent);
    }
    this.ref = this.vcr.createComponent(factory);

    this.statusChangesSubscription = this.formItem.control.statusChanges.subscribe(
      status => {
        if (this.formItem.control != null) {
          this.ref.instance.updateStatus(status, this.formItem.control.errors);
        }
      }
    );
  }

  ngOnDestroy() {
    this.ref.destroy();
    this.statusChangesSubscription.unsubscribe();
  }
}
