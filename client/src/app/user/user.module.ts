import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { UserRoute } from './user.routing';
import { CartComponent } from './cart/cart.component';
import { AddPackageFormComponent } from './form/add-package-form/add-package-form.component';



@NgModule({
  declarations: [
    UserComponent,
    CartComponent,
    AddPackageFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoute)
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }
