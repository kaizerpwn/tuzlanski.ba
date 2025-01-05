import { Component } from '@angular/core';
import { Article } from '../../../models/Article';
import { NewsService } from '../../../services/news.service';
import { formatTimeAgo } from '../../../utils/helpers';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-table',
  standalone: true,
  imports: [],
  templateUrl: './news-table.component.html',
  styleUrl: './news-table.component.css',
})
export class NewsTableComponent {
  news: Article[] = [];

  formatTimeAgo = formatTimeAgo;

  constructor(
    private newsService: NewsService,
    protected sanitizer: DomSanitizer
  ) {
    this.newsService.getNews().subscribe((data: any) => {
      this.news = data.map(
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
