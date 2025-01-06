import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../models/Article';
import { NewsService } from '../../../services/news.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  findBackgroundColorForCategory,
  findColorForCategory,
  formatTimeAgo,
} from '../../../utils/helpers';
import { SmallNewsCardComponent } from '../small-news-card/small-news-card.component';
import { CATEGORIES } from '../../../utils/constants';

@Component({
  selector: 'app-single-news',
  standalone: true,
  imports: [SidebarComponent, SmallNewsCardComponent],
  templateUrl: './single-news.component.html',
  styleUrl: './single-news.component.css',
})
export class SingleNewsComponent {
  newsId: string = '';
  content: SafeHtml = '';
  article!: Article;

  moreSimilarArticles: Article[] = [];

  formatTimeAgo = formatTimeAgo;
  findColorForCategory = findColorForCategory;
  findBackgroundColorForCategory = findBackgroundColorForCategory;
  ALL_CATEGORIES = CATEGORIES;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    protected sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.newsId = this.route.snapshot.paramMap.get('id') || '';

    this.route.params.subscribe((params) => {
      this.newsId = params['id'];

      this.newsService
        .getNewsById(Number(this.newsId))
        .subscribe((data: any) => {
          this.article = new Article(
            data.id,
            data.title,
            data.thumbnail,
            data.image_source,
            data.images,
            data.source_link,
            data.category,
            data.sub_categories,
            data.short_description,
            data.description,
            data.keywords,
            data.author,
            data.language,
            data.published_at
          );

          this.content = this.sanitizer.bypassSecurityTrustHtml(
            this.article.getDescription()
          );

          this.newsService
            .getNews(this.article.getCategory(), 10)
            .subscribe((data: any) => {
              this.moreSimilarArticles = data.items.map(
                (article: any) =>
                  new Article(
                    article.id,
                    article.title,
                    article.thumbnail,
                    article.image_source,
                    article.images,
                    article.source_link,
                    article.category,
                    article.sub_categories,
                    article.short_description,
                    article.description,
                    article.keywords,
                    article.author,
                    article.language,
                    article.published_at
                  )
              );
            });
        });
    });
  }
}
