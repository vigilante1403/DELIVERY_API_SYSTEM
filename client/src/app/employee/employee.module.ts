import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { RouterModule } from '@angular/router';
import { EmployeeRoute } from './employee.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRoute),
    FormsModule,ReactiveFormsModule
  ],
  exports:[
    EmployeeComponent
  ]
})
export class EmployeeModule { }
