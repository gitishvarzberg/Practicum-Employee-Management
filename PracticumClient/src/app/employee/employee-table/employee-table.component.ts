import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EmployeePut } from '../../EmploeyeePut.model';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../../add-role/add-role.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {

  constructor(private _employeeService: EmployeeService, private router: Router, public dialog: MatDialog) { }

  public employees: EmployeePut[] = [];
  highlightedRow: any;
  displayedColumns: string[] = ['edit', 'delete', 'firstName', 'lastName', 'id', 'startOfWorkDate'];
  isLoading: boolean = true;

  dataSource = new MatTableDataSource<EmployeePut>();
  highlightedRowIndex: number = -1;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    this.isLoading = true;
  }
  addemployee() {
    this.router.navigate(['employee-table/add-employee'])
  }
  navEditEmployee(employee: EmployeePut) {
    this._employeeService.employee = employee
    this._employeeService.employee.id = employee.id
    this.router.navigate(['employee-table/edit-employee'])
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportToExcel(): void {
    const fileName = 'employees.xlsx';
    const employeesWithoutRoles = this.employees.map(({ roles, ...employee }) => employee);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(employeesWithoutRoles);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, fileName);
  }
  delete(id: number) {
    if (confirm("Are you sure you want to delete?")) {
      this._employeeService.delete(id).subscribe({
        next: (res) => {
          this.getEmployees();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  private getEmployees() {
    this._employeeService.getEmployeesFromServer().subscribe({
      next: (res) => {
        this.employees = res;
        this.dataSource.data = this.employees;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  highlightRow(row: any): void {
    this.highlightedRow = row;
  }
  removeHighlight(): void {
    this.highlightedRow = null;
  }
  addRole() {
    this.dialog.open(AddRoleComponent);
  }

}