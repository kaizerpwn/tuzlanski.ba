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
import { EventService } from '../../../services/event.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users-create-modal',
  templateUrl: './users-create-modal.component.html',
  styleUrls: ['./users-create-modal.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsersCreateModalComponent {
  userForm: FormGroup;

  constructor(
    private userService: UsersService,
    private eventService: EventService,
    private fb: FormBuilder,
    protected dialogRef: MatDialogRef<UsersCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      date_of_birth: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(
        (response: any) => {
          this.eventService.emitUsersAdded();
          this.dialogRef.close(response);
        },
        (error: any) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
