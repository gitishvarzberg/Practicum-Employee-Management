import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeePut, Gender } from '../../EmploeyeePut.model';
import { Role } from '../../Role.model';
import { RoleName } from '../../RoleName.model';
import { RoleService } from '../../role.service';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  genders = [
    { value: Gender.Male, viewValue: 'Male' },
    { value: Gender.Female, viewValue: 'Female' }
  ];

  detailsForm: FormGroup;
  public selectedJobs: number[] = [];
  roles: Role[] = [];
  roleNames: RoleName[] = [];
  rolesArray: Role[] = [];
  selectedRoleNameIds: number[] = [];
  showAddRoleForm: boolean = false;

  addRoleButton: boolean = false;
  newRoleForm: FormGroup;
  error: boolean = false

  constructor(private _employeeService: EmployeeService, private fb: FormBuilder, private _roleService: RoleService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._roleService.getRoleNamesFromServer().subscribe({
      next: (res) => {
        this.roleNames = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.roles = this._employeeService.employee.roles;
    this.detailsForm = this.fb.group({
      firstName: [this._employeeService.employee.firstName, Validators.required],
      lastName: [this._employeeService.employee.lastName, Validators.required],
      identity: [this._employeeService.employee.identity, [Validators.required, Validators.pattern('[0-9]{9}')]],
      startOfWorkDate: [this._employeeService.employee.startOfWorkDate, Validators.required],
      dateOfBirth: [this._employeeService.employee.dateOfBirth, Validators.required],
      gender: [this._employeeService.employee.gender, Validators.required],
      roles: this.fb.array([] as Role[])
    });

    const rolesArray = this.detailsForm.get('roles') as FormArray
    this.roles.forEach(role => {
      rolesArray.push(this.fb.group({
        dateOfEntryIntoRole: [new Date(role.dateOfEntryIntoRole), Validators.required],
        isManagerialRole: [role.isManagerialRole ? true : false, Validators.required],
        roleNameId: [role.roleNameId, Validators.required],
      }));
      this.selectedJobs.push(role.roleNameId);
      this.selectedRoleNameIds.push(role.roleNameId);
    });
  }

  firstNameErrorMessage = '';
  lastNameErrorMessage = '';
  idNumberErrorMessage = '';
  dateOfBirthErrorMessage = '';
  genderErrorMessage = '';
  roleNameIdErrorMessage = '';
  isManagerialRoleErrorMessage = '';
  dateOfEntryIntoRoleErrorMessage = '';
  ErrorMessage = '';
  massage='';

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

  saveEmployee() {
    if (this.detailsForm.valid) {
      this.addRolesToArray();
      const newEmployee: EmployeePut = {
        id: this._employeeService.employee.id,
        identity: this.detailsForm.value.identity,
        firstName: this.detailsForm.value.firstName,
        lastName: this.detailsForm.value.lastName,
        startOfWorkDate: this.detailsForm.value.startOfWorkDate,
        dateOfBirth: this.detailsForm.value.dateOfBirth,
        gender: this.detailsForm.value.gender,
        roles: this.rolesArray,
      };

      this._employeeService.putEmployee(newEmployee).subscribe({
        next: (res) => {
          console.log("Employee saved successfully!");
          this._snackBar.open("Employee saved successfully!", "Ok", {
            duration: 3000,
          })
          this.router.navigate(['employee-table'])
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.validateForm();
    }
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

  removeRole(index: number): void {
    const rolesArray = this.detailsForm.get('roles') as FormArray;
    rolesArray.removeAt(index);
    this.selectedRoleNameIds.splice(index);
  }

  cancelAddRole() {
    this.showAddRoleForm = false;
    this.detailsForm.enable();
    this.addRoleButton = false;

    const rolesArray = this.detailsForm.get('roles') as FormArray;
    rolesArray.removeAt(length - 1);
    if (this.newRoleForm.value.roleNameId != '') {
      this.selectedRoleNameIds.splice(length - 1);
    }
  }

  saveRole() {
    const roleNameIdControl = this.newRoleForm.get('roleNameId');
    const dateOfEntryControl = this.newRoleForm.get('dateOfEntryIntoRole');
    if (this.newRoleForm.valid) {
      this.ErrorMessage = ''
      const role = this.newRoleForm.value;
      this.detailsForm.enable();
      this.addRoleButton = false;
      this.showAddRoleForm = false;
      this.selectedRoleNameIds.push(role.roleNameId);
      this._snackBar.open("Role saved successfully!", "Ok", {
        duration: 3000,
      })
    } else {
      this.ErrorMessage = 'all the field is requird'
    }
  }
  myFilterdateOfEntryIntoRole = (d: Date | null): boolean => {
    const startDate = new Date(this.detailsForm.value.startOfWorkDate);
    return d >= startDate;
  };

  myFilterStartDate = (d: Date | null): boolean => {
    const roleAdded = this.detailsForm.get('roles').value.length > 0;
    if (roleAdded) {
      
      const closestRoleEntryDate = this.findClosestRoleEntryDate(d);
      return !d || (!closestRoleEntryDate || d <= closestRoleEntryDate);
    } else {
      return true;
    }
  };

  findClosestRoleEntryDate(date: Date): Date | null {
    const roles = this.detailsForm.get('roles').value;
    if (roles.length === 0) {
      return null;
    };

    let closestDate = new Date(roles[0].dateOfEntryIntoRole);
    roles.forEach(role => {
      const entryDate = new Date(role.dateOfEntryIntoRole);
      if (entryDate < date && entryDate < closestDate) {
        closestDate = entryDate;
      }
    });
    return closestDate;
  }

  addRole() {
    if (this.detailsForm.valid) {
      this.showAddRoleForm = true;
      this.addRoleButton = true;
  
      this.newRoleForm = this.fb.group({
        roleNameId: ['', Validators.required],
        isManagerialRole: ['', Validators.required],
        dateOfEntryIntoRole: ['', Validators.required]
      });
      const rolesArray = this.detailsForm.get('roles') as FormArray;
      rolesArray.push(this.newRoleForm);
    } else {
      this.validateForm();
    }
  }

  onRoleSelectionChange(event: MatSelectChange, index: number) {
    this.selectedRoleNameIds[index] = event.value;
  };
}