import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../role.service';
import { RoleNamePost } from '../RoleName.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  constructor(private _roleService: RoleService, private _snackBar: MatSnackBar) { }
  roleNameControl = new FormControl('');

  onSubmit() {
    const newRole: RoleNamePost = {
      name: this.roleNameControl.value
    };

    this._roleService.save(newRole).subscribe({
      next: (res) => {
        this._snackBar.open("Role saved successfully!", "Ok", {
          duration: 3000,
        })
      },
      error: (err) => {
        console.error(err);
      }
    });
    window.history.back();
  }
}
