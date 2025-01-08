import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../../components/admin/admin-sidebar/admin-sidebar.component';
import { UsersTableComponent } from '../../components/admin/users-table/users-table.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersCreateModalComponent } from '../../components/admin/users-create-modal/users-create-modal.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [AdminSidebarComponent, UsersTableComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  constructor(private dialog: MatDialog) {}

  openCreateUserModal() {
    this.dialog.open(UsersCreateModalComponent);
  }
}
