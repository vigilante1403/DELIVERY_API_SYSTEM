import { Routes } from "@angular/router";

import { ManageComponent } from "./manage.component";
import { ChartComponent } from "./chart/chart.component";
import { AddLocationComponent } from "./location/action/add-location/add-location.component";

export const manageRoutes:Routes=[
    {path:'all/:option',component:ManageComponent},
    {path:'all',component:ManageComponent},
    {path:'chart',component:ChartComponent},
    
    
]