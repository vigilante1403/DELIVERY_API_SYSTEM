import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AuthenticationGuard } from "../middleware/authentication.guard";

export const AdminRoute: Routes = [
    {path: '', component: AdminComponent},
    
];