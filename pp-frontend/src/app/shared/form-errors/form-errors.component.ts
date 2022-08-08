import { Component, Input } from '@angular/core';

@Component({
  selector: 'required-error-handler',
  template: `<small class="form-text text-danger danger" *ngIf="formname.controls[fieldname].hasError('required') && (formname.get(fieldname).dirty || formname.get(fieldname).touched)">{{keyname}} is required</small>`

})
export class RequriredErrorHandlerComponent {

  @Input() fieldName: string = '';
  @Input() formName: string = '';
  @Input() keyName: string = '';

}


@Component({
  selector: 'field-match-error-handler',
  template: `<small class="form-text text-danger danger" *ngIf="formname.controls[fieldname].hasError('mustMatch') && (formname.get(fieldname).dirty || formname.get(fieldname).touched)">{{message}}</small>`

})
export class FieldMatchErrorHandlerComponent {

  @Input() fieldName: string = '';
  @Input() formName: string = '';
  @Input() message: string = '';

}


@Component({
  selector: 'emailpattern-error-handler',
  template: `<small class="form-text text-danger danger" *ngIf="formname.controls[fieldname].hasError('pattern') && (formname.controls[fieldname].dirty)">{{keyname}} is not valid</small>`,

})
export class EmailPatternErrorHandlerComponent {

  @Input() fieldName: string = '';
  @Input() formName: string = '';
  @Input() keyName: string = '';

}

@Component({
  selector: 'contactpattern-error-handler',
  template: `<small class="form-text text-danger danger" *ngIf="formname.controls[fieldname].hasError('pattern') && (formname.controls[fieldname].dirty)">{{keyname}} is not valid</small>`,

})
export class ContactPatternErrorHandlerComponent {

  @Input() fieldName: string = '';
  @Input() formName: string = '';
  @Input() keyName: string = '';

}

@Component({
  selector: 'pattern-error-handler',
  template: `<small class="form-text text-danger danger" *ngIf="formname.controls[fieldname].hasError('pattern') && (formname.controls[fieldname].dirty)">{{message}}</small>`,

})
export class PatternErrorHandlerComponent {

  @Input() fieldName: string = '';
  @Input() formName: string = '';
  @Input() message: string = '';

}


@Component({
  selector: 'cnicpattern-error-handler',
  template: `<small class="text-muted danger d-block mb-0" *ngIf="formname.controls[fieldname].hasError('pattern') && (formname.controls[fieldname].dirty)">{{fieldname}} is not valid</small>`,

})
export class CnicPatternErrorHandlerComponent {

  @Input() fieldName: string = '';
  @Input() formName: string = '';

}


@Component({
  selector: 'minlength-error-handler',
  //template: `<p class="red-text" *ngIf="formname.controls[fieldname].hasError('minlength') && formname.get(fieldname).dirty || formname.get(fieldname).touched">use {{minLength}} or more characters for {{fieldname}}</p>`,
  template: `<small class="form-text text-danger danger" *ngIf="formname.controls[fieldname].hasError('minlength') && (formname.controls[fieldname].dirty)">{{message}}</small>`,

})
export class MinLengthErrorHandlerComponent {

  @Input() fieldName: string = '';
  @Input() formName: string = '';
  @Input() message: string = '';



}


@Component({
  selector: 'maxlength-error-handler',
  template: `<small class="form-text text-danger danger" *ngIf="formname.controls[fieldname].hasError('maxlength') && (formname.controls[fieldname].dirty)">{{message}}</small>`,

})
export class MaxLengthErrorHandlerComponent {

  @Input() fieldName: string = '';
  @Input() formName: string = '';
  @Input() message: string = '';



}


@Component({
  selector: 'minimum-error-handler',
  template: `<small class="text-muted danger d-block mb-0" *ngIf="formname.controls[fieldname].hasError('min') && formname.controls[fieldname].touched">{{keyname}} cannot be lesser than {{minimum}}</small>`

})
export class MinimumErrorHandlerComponent {

  @Input() fieldName: string = '';
  @Input() formName: string = '';
  @Input() minimum: number = 0;
  @Input() keyName: string = '';


}


@Component({
  selector: 'maximum-error-handler',
  template: `<small class="form-text text-danger danger" *ngIf="formname.controls[fieldname].hasError('max') && formname.controls[fieldname].touched">{{fieldname}} cannot be exceed than {{maximum}}</small>`

})
export class MaximumErrorHandlerComponent {

  @Input() fieldName: string = '';
  @Input() formName: string = '';
  @Input() maximum: number = 0;


}

export const FormErrorsComponent = [
  RequriredErrorHandlerComponent,
  FieldMatchErrorHandlerComponent,
  EmailPatternErrorHandlerComponent,
  ContactPatternErrorHandlerComponent,
  CnicPatternErrorHandlerComponent,
  PatternErrorHandlerComponent,
  MinLengthErrorHandlerComponent,
  MaxLengthErrorHandlerComponent,
  MinimumErrorHandlerComponent,
  MaximumErrorHandlerComponent
];
