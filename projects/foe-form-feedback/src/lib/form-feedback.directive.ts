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
  private control: AbstractControl;
  private ref: ComponentRef<FormFeedback>;
  private statusChangesSubscription: Subscription;

  constructor(
    @Self() formItem: NgControl,
    @Optional() @Inject(TOKEN) private customComponent: Type<FormFeedback>,
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {
    if (formItem.control == null) {
      return;
    }
    this.control = formItem.control;
  }

  ngOnInit() {
    let factory;
    if (this.customComponent == null) {
      factory = this.cfr.resolveComponentFactory(FormFeedbackComponent);
    } else {
      factory = this.cfr.resolveComponentFactory(this.customComponent);
    }
    this.ref = this.vcr.createComponent(factory);

    this.statusChangesSubscription = this.control.statusChanges.subscribe(
      status => {
        this.ref.instance.updateStatus(status, this.control.errors);
      }
    );
  }

  ngOnDestroy() {
    this.ref.destroy();
    this.statusChangesSubscription.unsubscribe();
  }
}
