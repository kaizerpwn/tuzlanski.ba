import { Component, Input } from '@angular/core';
import { SmallNewsCardComponent } from '../small-news-card/small-news-card.component';
import { Article } from '../../models/Article';
import { CATEGORIES } from '../../utils/constants';
import { findColorForCategory } from '../../utils/helpers';
@Component({
  selector: 'app-side-news-list',
  standalone: true,
  imports: [SmallNewsCardComponent],
  templateUrl: './side-news-list.component.html',
  styleUrl: './side-news-list.component.css',
})
export class SideNewsListComponent {
  @Input() articles: Article[] = [];

  findColorForCategory = findColorForCategory;
  ALL_CATEGORIES = CATEGORIES;
}
