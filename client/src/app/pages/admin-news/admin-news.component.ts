import { Component } from '@angular/core';
import { NewsTableComponent } from '../../components/admin/news-table/news-table.component';
import { AdminSidebarComponent } from '../../components/admin/admin-sidebar/admin-sidebar.component';
import { MatDialog } from '@angular/material/dialog';
import { NewsModalComponent } from '../../components/admin/news-create-modal/news-create-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-news',
  standalone: true,
  imports: [NewsTableComponent, AdminSidebarComponent],
  templateUrl: './admin-news.component.html',
  styleUrl: './admin-news.component.css',
})
export class AdminNewsComponent {
  constructor(
    private dialogRef: MatDialog,
    private router: Router,
    private authService: AuthService
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
