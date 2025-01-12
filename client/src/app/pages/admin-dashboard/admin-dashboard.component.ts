import { Component } from '@angular/core';
import { NewsTableComponent } from '../../components/admin/news-table/news-table.component';
import { AnalyticsComponent } from '../../components/admin/analytics/analytics.component';
import { AdminSidebarComponent } from '../../components/admin/admin-sidebar/admin-sidebar.component';
import { MatDialog } from '@angular/material/dialog';
import { NewsModalComponent } from '../../components/admin/news-create-modal/news-create-modal.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NewsTableComponent, AnalyticsComponent, AdminSidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor(
    private dialogRef: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  openCreateModal() {
    const dialogRef = this.dialogRef.open(NewsModalComponent, {
      width: '800px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }
}
