import { DashboardModule } from './admin/dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './middleware/authentication.guard';
import { AuthorizationGuard } from './middleware/authorization.guard';
import { ServicePageComponent } from './service-page/our-service/service-page.component';
import { PricePerDistanceComponent } from './service-page/price-per-distance/price-per-distance.component';
import { ProfileComponent } from './profile/profile.component';
import { DeliveryAgentPageComponent } from './service-page/delivery-agent-page/delivery-agent-page.component';
import { EmployeeAuthoGuard } from './middleware/employee-autho.guard';
import { VerifySendToComponent } from './user/forgot-password/verify-send-to/verify-send-to.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';

export const routes: Routes = [
  // {path: '', loadChildren: ()=>import('./home/home.module').then(mod => mod.HomeModule)},
  {path: '', component:HomeComponent},
  {path: 'admin', loadChildren: ()=>import('./admin/admin.module').then(mod => mod.AdminModule),canActivate:[AuthenticationGuard,AuthorizationGuard]},
  {path: 'employee', loadChildren: ()=>import('./employee/employee.module').then(mod => mod.EmployeeModule),canActivate:[AuthenticationGuard,EmployeeAuthoGuard]},
  {path: 'user', loadChildren: ()=>import('./user/user.module').then(mod => mod.UserModule),canActivate:[AuthenticationGuard]},
  {path: 'service', component: ServicePageComponent},
  {path: 'priceByDistance', component: PricePerDistanceComponent},
  // {path: 'profile', component: ProfileComponent},
  {path: 'agent', component: DeliveryAgentPageComponent},
  {path: '1/reset/:token', component: VerifySendToComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
