import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-single-news',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './single-news.component.html',
  styleUrl: './single-news.component.css',
})
export class SingleNewsComponent {}
