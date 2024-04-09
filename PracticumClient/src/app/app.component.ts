import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeRoutingModule } from './employee/employee-routing.module';
import { EmployeeTableComponent } from './employee/employee-table/employee-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,EmployeeModule,EmployeeRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practicum';
}
