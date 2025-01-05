import { Component } from '@angular/core';
import { IntegrationsService } from '../../services/integrations.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
  newsCount = 0;
  usersCount = 0;
  todaysNewsCount = 0;

  constructor(private integrationsService: IntegrationsService) {
    this.integrationsService.getCount().subscribe((data: any) => {
      this.newsCount = data.news_count;
      this.usersCount = data.users_count;
      this.todaysNewsCount = data.todays_news_count;
    });
  }
}
