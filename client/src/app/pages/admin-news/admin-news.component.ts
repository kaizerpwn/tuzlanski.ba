import { Component } from '@angular/core';
import { NewsTableComponent } from '../../components/admin/news-table/news-table.component';
import { AdminSidebarComponent } from '../../components/admin/admin-sidebar/admin-sidebar.component';
import { MatDialog } from '@angular/material/dialog';
import { NewsModalComponent } from '../../components/admin/news-create-modal/news-create-modal.component';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';

@Component({
  selector: 'app-admin-news',
  standalone: true,
  imports: [NewsTableComponent, AdminSidebarComponent, PaginationComponent],
  templateUrl: './admin-news.component.html',
  styleUrl: './admin-news.component.css',
})
export class AdminNewsComponent {
  constructor(private dialogRef: MatDialog) {}

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
