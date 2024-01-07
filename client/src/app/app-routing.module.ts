import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {path: '', loadChildren: ()=>import('./home/home.module').then(mod => mod.HomeModule)},
  {path: '', component: HomeComponent},
  {path: '/admin', loadChildren: ()=>import('./admin/admin.module').then(mod => mod.AdminModule)},
  {path: '/employee', loadChildren: ()=>import('./employee/employee.module').then(mod => mod.EmployeeModule)},
  {path: '/user', loadChildren: ()=>import('./user/user.module').then(mod => mod.UserModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
