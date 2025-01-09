import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../../components/admin/admin-sidebar/admin-sidebar.component';
import { UsersTableComponent } from '../../components/admin/users-table/users-table.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersCreateModalComponent } from '../../components/admin/users-create-modal/users-create-modal.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [AdminSidebarComponent, UsersTableComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  openCreateUserModal() {
    this.dialog.open(UsersCreateModalComponent);
  }
}
