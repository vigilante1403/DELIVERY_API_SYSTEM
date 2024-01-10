import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { RouterModule } from '@angular/router';
import { EmployeeRoute } from './employee.routing';



@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRoute)
  ],
  exports:[
    EmployeeComponent
  ]
})
export class EmployeeModule { }
