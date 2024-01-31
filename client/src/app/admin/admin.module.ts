import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoute } from './admin.routing';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { IconPickerModule } from 'ngx-icon-picker';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ManageComponent } from './manage/manage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxPayPalModule } from 'ngx-paypal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MakeRoleComponent } from './make-role/make-role.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';



@NgModule({
  declarations: [
    MakeRoleComponent,
    NewEmployeeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoute),
    IconPickerModule,
    MatCardModule,
    MatListModule,
    FontAwesomeModule,
    FormsModule,ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    NgxPayPalModule,
    CollapseModule.forRoot(),
    
    MatSnackBarModule,

  ],
  exports:[

  ],
  schemas: [
   
  ],
})
export class AdminModule { }
