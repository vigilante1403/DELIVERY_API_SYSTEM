import { Routes } from "@angular/router";

import { ManageComponent } from "./manage.component";

export const manageRoutes:Routes=[
    {path:'all/:option',component:ManageComponent},
    {path:'all',component:ManageComponent},
    
]