import { Component } from '@angular/core';
import { NewsTableComponent } from '../../components/admin/news-table/news-table.component';
import { AdminSidebarComponent } from '../../components/admin/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-news',
  standalone: true,
  imports: [NewsTableComponent, AdminSidebarComponent],
  templateUrl: './admin-news.component.html',
  styleUrl: './admin-news.component.css',
})
export class AdminNewsComponent {}
