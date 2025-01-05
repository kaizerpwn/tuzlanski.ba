import { Component } from '@angular/core';
import { NewsTableComponent } from '../../components/admin/news-table/news-table.component';
import { AnalyticsComponent } from '../../components/admin/analytics/analytics.component';
import { AdminSidebarComponent } from '../../components/admin/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NewsTableComponent, AnalyticsComponent, AdminSidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {}
