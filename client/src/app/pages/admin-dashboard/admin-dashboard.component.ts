import { Component } from '@angular/core';
import { NewsTableComponent } from '../../components/news-table/news-table.component';
import { AnalyticsComponent } from '../../components/analytics/analytics.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NewsTableComponent, AnalyticsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {}
