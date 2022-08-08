import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormErrorsComponent } from './form-errors/form-errors.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FormErrorsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
