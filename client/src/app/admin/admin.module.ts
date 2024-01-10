import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoute } from './admin.routing';
import { AdminComponent } from './admin.component';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoute)
  ],
  exports:[
    AdminComponent
  ]
})
export class AdminModule { }
