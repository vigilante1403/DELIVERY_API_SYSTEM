import { DashboardModule } from './admin/dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './middleware/authentication.guard';
import { AuthorizationGuard } from './middleware/authorization.guard';

export const routes: Routes = [
  // {path: '', loadChildren: ()=>import('./home/home.module').then(mod => mod.HomeModule)},
  {path: '', component:HomeComponent},
  {path: 'admin', loadChildren: ()=>import('./admin/admin.module').then(mod => mod.AdminModule),canActivate:[AuthenticationGuard,AuthorizationGuard]},
  {path: 'employee', loadChildren: ()=>import('./employee/employee.module').then(mod => mod.EmployeeModule),canActivate:[AuthenticationGuard,AuthorizationGuard]},
  {path: 'user', loadChildren: ()=>import('./user/user.module').then(mod => mod.UserModule)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
