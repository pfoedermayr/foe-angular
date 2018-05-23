# foe-form-feedback

A simple but customizable form-feedback library.

Demo can be found [here](https://stackblitz.com/edit/simple-form-feedback?file=src%2Fapp%2Fapp.component.html).
<!-- TODO Changelog can be found here: LINK-->

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Customization](#customization)

## Installation

Install the `foe-form-feedback` npm module:

```sh
npm install foe-form-feedback --save
```

## Usage

#### 1. Import `FormFeedbackModule`

Import `FormFeedbackModule` into the module which shall use form-feedback or into your shared module. 

```ts
import { NgModule } from '@angular/core';
import { FormFeedbackModule } from 'foe-form-feedback';

@NgModule({
    imports: [
        FormFeedbackModule
    ]
})
export class MyModule { }
```

#### 2. Use form-feedback

Apply the `foeFormFeedback` directive to your `form`.

**Example**
```html
<input type="text" minlength="12" maxlength="15" required [(ngModel)]="name" foeFormFeedback>
```

## Customization

### Providing custom messages ([Demo](https://stackblitz.com/edit/custom-service-form-feedback))

1. Create a `service` which implements `ErrorMessageService`.
```ts
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

import { ErrorMessageService } from 'foe-form-feedback';

@Injectable()
export class MyMessageService implements ErrorMessageService {
    get(errors: ValidationErrors): Observable<string[]> {
        ...
    }
}
```
2. Import `FormFeedbackModule` by using the `withCustomMessageService` method
```ts
import { NgModule } from '@angular/core';
import { FormFeedbackModule } from 'foe-form-feedback';

import { MyMessageService } from './my-message.service';

@NgModule({
    imports: [
        FormFeedbackModule.withCustomMessageService(MyMessageService)
    ]
})
export class MyModule { }
```

### Use a custom component ([Demo](https://stackblitz.com/edit/custom-component-form-feedback))

1. Create a `component` which implements `FormFeedback`
```ts
import { Component } from '@angular/core';
import { FormFeedback } from 'foe-form-feedback';

@Component({
    templateUrl: 'my-feedback.component.html',
    styleUrls: ['my-feedback.component.scss']
})
export class MyFeedbackComponent implements FormFeedback {
    updateStatus(status: string, errors: ValidationErrors | null) {
        ...
    }
}

```

2. Import `FormFeedbackModule` by using the `withCustomFeedback` method
```ts
import { NgModule } from '@angular/core';
import { FormFeedbackModule } from 'foe-form-feedback';

import { MyFeedbackComponent } from './my-feedback.component';

@NgModule({
    imports: [
        FormFeedbackModule.withCustomFeedback(MyFeedbackComponent)
    ]
})
export class MyModule { }
```