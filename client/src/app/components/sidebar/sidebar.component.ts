import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../models/Article';
import {
  exportFirstSubCategory,
  findColorForCategory,
  formatTimeAgo,
} from '../../utils/helpers';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  latestArticles: Article[] = [];

  exportFirstSubCategory = exportFirstSubCategory;
  formatTimeAgo = formatTimeAgo;
  findColorForCategory = findColorForCategory;

  constructor(private newsService: NewsService) {
    this.loadLatestArticles();
  }

  private loadLatestArticles(): void {
    this.newsService.getNews('', 12).subscribe((data: any) => {
      this.latestArticles = data.map(
        (item: any) =>
          new Article(
            item.id,
            item.title,
            item.thumbnail,
            item.image_source,
            item.images,
            item.source_link,
            item.category,
            item.sub_categories,
            item.short_description,
            item.description,
            item.keywords,
            item.author,
            item.language,
            item.published_at
          )
      );
    });
  }
}
