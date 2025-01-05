import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NewsTableComponent } from '../../components/admin/news-table/news-table.component';
import { AnalyticsComponent } from '../../components/admin/analytics/analytics.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NewsTableComponent, AnalyticsComponent, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
