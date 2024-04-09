import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { Route, RouterModule } from '@angular/router';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';


const RECIPE_ROUTES: Route[] = [
  { path: '', redirectTo: 'employee-table', pathMatch: 'full' },
  { path: '', component: EmployeeTableComponent },
  { path: 'edit-employee', component: EditEmployeeComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(RECIPE_ROUTES)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
