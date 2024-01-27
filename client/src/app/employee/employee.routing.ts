import { Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";
import { UserDeliveryFetchComponent } from "./user-delivery-fetch/user-delivery-fetch.component";
import { AuthenticationGuard } from "../middleware/authentication.guard";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { DeliveringComponent } from "./delivering/delivering.component";

export const EmployeeRoute: Routes = [
    {path: '', component: EmployeeComponent,canActivate:[AuthenticationGuard]},
    {path:'customer/:email/deliveries',component:UserDeliveryFetchComponent,canActivate:[AuthenticationGuard]},
    {path:'customer/:orderId/edit/process',component:UserEditComponent,canActivate:[AuthenticationGuard]},
    {path: 'edit-profile',component:EditProfileComponent,canActivate:[AuthenticationGuard]},
    {path: 'delivering',component:DeliveringComponent,canActivate:[AuthenticationGuard]}
    
];