import { Component } from '@angular/core';
import { SmallNewsCardComponent } from '../small-news-card/small-news-card.component';

@Component({
  selector: 'app-side-news-list',
  standalone: true,
  imports: [SmallNewsCardComponent],
  templateUrl: './side-news-list.component.html',
  styleUrl: './side-news-list.component.css',
})
export class SideNewsListComponent {}
