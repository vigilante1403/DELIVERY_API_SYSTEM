import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { FormComponent } from "./dashboard/form/form.component";
import { OrdersComponent } from "./dashboard/orders/orders.component";
import { CustomerFormComponent } from "../form/customer-form/customer-form.component";
import { AllOrdersComponent } from "./manage/all-orders/all-orders.component";
import { AuthenticationGuard } from "../middleware/authentication.guard";
import { AuthorizationGuard } from "../middleware/authorization.guard";
import { EditProfileComponent } from "../employee/edit-profile/edit-profile.component";
import { ProfileComponent } from "../profile/profile.component";
import { OrdersFormComponent } from "../user/form/orders-form/orders-form.component";
import { NewCartComponent } from "../user/new-cart/new-cart.component";
import { CheckoutComponent } from "../user/checkout/checkout.component";
import { ForgotPasswordComponent } from "../user/forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "../user/change-password/change-password.component";
import { NewCheckoutComponent } from "../user/new-checkout/new-checkout.component";
import { VerifySendToComponent } from "../user/forgot-password/verify-send-to/verify-send-to.component";
import { UpdateUnpaidFormsComponent } from "../user/update-unpaid-forms/update-unpaid-forms.component";


export const AdminRoute: Routes = [
    {path: '', component: AdminComponent,canActivate:[AuthenticationGuard,AuthorizationGuard]},
    // {path: 'dashboard', component: DashboardComponent,
    // children: [
    //     {path: 'form', component: FormComponent},
    //     {path: 'orders', component: OrdersComponent},
    //     {path: 'forms', loadChildren: () => import('../form/form.module').then(mod => mod.FormManageModule)},
        
    // ]
    // },
    {path:'manage',loadChildren:()=>import('./manage/manage.module').then(mod=>mod.ManageModule),canActivate:[AuthenticationGuard,AuthorizationGuard]},
    {path: 'edit-profile',component:EditProfileComponent,canActivate:[AuthenticationGuard]},
    {path:'profile',component:ProfileComponent,canActivate:[AuthenticationGuard]},
    {path:'order/new',component:OrdersFormComponent,canActivate:[AuthenticationGuard]},
    {path:'order/cart/:customerId/:orderId/checkout',component:CheckoutComponent,canActivate:[AuthenticationGuard]},
    {path:'new-cart',component:NewCartComponent,canActivate:[AuthenticationGuard]},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'change-password', component: ChangePasswordComponent},
    {path:"checkout",component:NewCheckoutComponent,canActivate:[AuthenticationGuard]},
    {path: '1/reset/:token', component: VerifySendToComponent},
    {path:'edit/:orderId',component:UpdateUnpaidFormsComponent,canActivate:[AuthenticationGuard]},
    
];