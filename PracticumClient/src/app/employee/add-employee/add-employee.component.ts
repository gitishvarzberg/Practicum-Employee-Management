import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, Gender } from '../../Employee.model';
import { RoleService } from '../../role.service';
import { RoleName } from '../../RoleName.model';
import { EmployeeService } from '../../employee.service';
import { Role } from '../../Role.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  detailsForm: FormGroup;
  showAddRoleForm: boolean = false;
  roleForm: FormGroup;
  roleNames: RoleName[] = [];
  rolesArray: Role[] = [];
  selectedRoleNameIds: number[] = [];
  saveButtonEnabled: boolean = true;

  constructor(
    private readonly _roleService: RoleService,
    private readonly _employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identity: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      startOfWorkDate: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      roles: this.fb.array([])
    });

    this.roleForm = this.fb.group({
      roleNameId: ['', Validators.required],
      isManagerialRole: ['', Validators.required],
      dateOfEntryIntoRole: ['', Validators.required]
    });

    this._roleService.getRoleNamesFromServer().subscribe({
      next: (res) => {
        this.roleNames = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  genders = [
    { value: Gender.Male, viewValue: 'Male' },
    { value: Gender.Female, viewValue: 'Female' }
  ];

  firstNameErrorMessage = '';
  lastNameErrorMessage = '';
  idNumberErrorMessage = '';
  dateOfBirthErrorMessage = '';
  genderErrorMessage = '';
  roleNameIdErrorMessage = '';
  isManagerialRoleErrorMessage = '';
  dateOfEntryIntoRoleErrorMessage = '';

  saveEmployee() {
    if (this.detailsForm.valid) {
      this.addRolesToArray();
      const newEmployee: Employee = {
        identity: this.detailsForm.value.identity,
        firstName: this.detailsForm.value.firstName,
        lastName: this.detailsForm.value.lastName,
        startOfWorkDate: this.detailsForm.value.startOfWorkDate,
        dateOfBirth: this.detailsForm.value.dateOfBirth,
        gender: this.detailsForm.value.gender,
        roles: this.rolesArray,
        isDeleted: false
      };

      this._employeeService.save(newEmployee).subscribe({
        next: (res) => {
          if (res == null) {
            alert("The employee exists in the system");
          }
          else {
            this._snackBar.open("Employee saved successfully!", "Ok", {
              duration: 3000,
            })
          }


          this.router.navigate(['employee-table'])
        },
        error: (err) => {
          console.error("Error occurred while saving employee:", err);
        }
      });
    } else {
      this.validateForm();
    }
  }

  validateForm() {
    const controls = this.detailsForm.controls;
    for (const controlName in controls) {
      const control = controls[controlName];
      const controlErrors = control.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((key) => {
          switch (key) {
            case 'required':
              this.setError(controlName, 'This field is required.');
              break;
            case 'pattern':
              this.setError(controlName, 'Invalid format.');
              break;
            default:
              break;
          }
        });
      } else {
        this.setError(controlName, '');
      }
    }
  }

  setError(controlName: string, errorMessage: string) {
    switch (controlName) {
      case 'firstName':
        this.firstNameErrorMessage = errorMessage;
        break;
      case 'lastName':
        this.lastNameErrorMessage = errorMessage;
        break;
      case 'identity':
        this.idNumberErrorMessage = errorMessage;
        break;
      case 'dateOfBirth':
        this.dateOfBirthErrorMessage = errorMessage;
        break;
      case 'gender':
        this.genderErrorMessage = errorMessage;
        break;
    }
  }
  findClosestRoleEntryDate(date: Date): Date | null {
    const roles = this.detailsForm.get('roles').value;
    if (roles.length === 0) {
      return null;
    }

    let closestDate = new Date(roles[0].dateOfEntryIntoRole);
    roles.forEach(role => {
      const entryDate = new Date(role.dateOfEntryIntoRole);
      if (entryDate < date && entryDate < closestDate) {
        closestDate = entryDate;
      }
    });
    return closestDate;
  }

  myFilterStartDate = (d: Date | null): boolean => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const roleAdded = this.detailsForm.get('roles').value.length > 0;
    if (roleAdded) {
      const closestRoleEntryDate = this.findClosestRoleEntryDate(d);
      return !d || (d >= currentDate && (!closestRoleEntryDate || d <= closestRoleEntryDate));
    } else {
      return !d || d >= currentDate;
    }
  };

  myFilterdateOfEntryIntoRole = (d: Date | null): boolean => {
    const startDate = this.detailsForm.value.startOfWorkDate;
    return !d || d >= startDate;
  };

  addRole() {
    if (this.detailsForm.valid) {
      this.detailsForm.disable();
      this.saveButtonEnabled = false;
      this.showAddRoleForm = true;
    } else {
      this.validateForm();
    }
  }

  saveRole() {
    if (this.roleForm.valid) {
      {
        const role = this.roleForm.value;
        const jobsArray = this.detailsForm.get('roles') as FormArray;
        jobsArray.push(this.fb.group(role));
        this.showAddRoleForm = false;
        this.detailsForm.enable();
        this.saveButtonEnabled = true;
        this.roleForm.reset();
        this.selectedRoleNameIds = jobsArray.value.map(role => role.roleNameId);
        this._snackBar.open("Role saved successfully!", "Ok", {
          duration: 3000,
        })
      }
    } else {
      this.validateRoleForm();
    }
  }

  validateRoleForm() {
    const controls = this.roleForm.controls;
    for (const controlName in controls) {
      const control = controls[controlName];
      const controlErrors = control.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((key) => {
          if (key === 'required') {
            this.setErrorRole(controlName, 'This field is required.');
          }
        });
      } else {
        this.setErrorRole(controlName, '');
      }
    }
  }

  setErrorRole(controlName: string, errorMessage: string) {
    switch (controlName) {
      case 'roleNameId':
        this.roleNameIdErrorMessage = errorMessage;
        break;
      case 'isManagerialRole':
        this.isManagerialRoleErrorMessage = errorMessage;
        break;
      case 'dateOfEntryIntoRole':
        this.dateOfEntryIntoRoleErrorMessage = errorMessage;
        break;
    }
  }

  cancelAddRole() {
    this.showAddRoleForm = false;
    this.saveButtonEnabled = true;
    this.detailsForm.enable();
    this.roleForm.reset();
  }

  addRolesToArray() {
    for (const role of this.detailsForm.value.roles) {
      this.rolesArray.push({
        roleNameId: role.roleNameId,
        isManagerialRole: role.isManagerialRole,
        dateOfEntryIntoRole: role.dateOfEntryIntoRole
      });
    }
  }
}
