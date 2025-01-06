import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../models/Article';
import { NewsService } from '../../../services/news.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { NewsModalComponent } from '../news-create-modal/news-create-modal.component';
import { EventService } from '../../../services/event.service';
import { Subscription } from 'rxjs';
import { NewsEditModalComponent } from '../news-edit-modal/news-edit-modal.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-news-table',
  standalone: true,
  imports: [PaginationComponent, NgFor],
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.css'],
})
export class NewsTableComponent implements OnInit, OnDestroy {
  news: Article[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  private newsAddedSubscription!: Subscription;

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

  fetchNews(page: number = 1) {
    this.newsService.getNews(undefined, 10, page).subscribe((response: any) => {
      this.news = response.items.map(
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
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;
    });
  }

  onPageChange(page: number) {
    this.fetchNews(page);
  }

  openCreateNewsModal() {
    this.dialog.open(NewsModalComponent);
  }

  openEditNewsModal(news: Article) {
    this.dialog.open(NewsEditModalComponent, { data: news });
  }

  protected deleteNews(id: number) {
    this.newsService.deleteNews(id).subscribe(() => {
      this.news = this.news.filter((item) => item.getId() !== id);
      this.fetchNews(this.currentPage);
    });
  }
}
