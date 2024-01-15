import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoute } from './admin.routing';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoute)
  ],
  exports:[
    AdminComponent
  ],
  schemas: [
   
  ],
})
export class AdminModule { }
