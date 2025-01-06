import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../models/Article';
import { NewsService } from '../../../services/news.service';
import { formatTimeAgo } from '../../../utils/helpers';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { NewsModalComponent } from '../news-create-modal/news-create-modal.component';
import { EventService } from '../../../services/event.service';
import { Subscription } from 'rxjs';
import { NewsEditModalComponent } from '../news-edit-modal/news-edit-modal.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  selector: 'app-news-table',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.css'],
})
export class NewsTableComponent implements OnInit, OnDestroy {
  news: Article[] = [];
  private newsAddedSubscription!: Subscription;

  formatTimeAgo = formatTimeAgo;

  constructor(
    private newsService: NewsService,
    private eventService: EventService,
    protected sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchNews();
    this.newsAddedSubscription = this.eventService.newsAdded$.subscribe(() => {
      this.fetchNews();
    });
  }

  ngOnDestroy() {
    if (this.newsAddedSubscription) {
      this.newsAddedSubscription.unsubscribe();
    }
  }

  fetchNews() {
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

  openCreateNewsModal() {
    this.dialog.open(NewsModalComponent);
  }

  openEditNewsModal(news: Article) {
    this.dialog.open(NewsEditModalComponent, {
      data: news,
    });
  }

  protected deleteNews(id: number) {
    this.newsService.deleteNews(id).subscribe((data: any) => {
      this.news = this.news.filter((item) => item.getId() !== id);
    });
  }
}
