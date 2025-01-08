import { Component, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-users-edit-modal',
  templateUrl: './users-edit-modal.component.html',
  styleUrls: ['./users-edit-modal.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsersEditModalComponent {
  userForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private eventService: EventService,
    private fb: FormBuilder,
    protected dialogRef: MatDialogRef<UsersEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      id: [data.id, Validators.required],
      username: [data.username, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [data.role, Validators.required],
      date_of_birth: [data.date_of_birth, Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.usersService.updateUser(this.userForm.value).subscribe(
        (response: any) => {
          this.eventService.emitUsersAdded();
          this.dialogRef.close(response);
        },
        (error: any) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
