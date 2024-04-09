import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [ 
    {path:"", redirectTo: "employee-table", pathMatch: "full" },
    {path:'employee-table',loadChildren:()=>import('./employee/employee.module').then(x=>x.EmployeeModule)},
    {path:"**" ,component:NotfoundComponent},
];

