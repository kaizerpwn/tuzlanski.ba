import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/Article';
import { CATEGORIES } from '../../utils/constants';
import {
  findColorForCategory,
  findMostUsedSubCategories,
} from '../../utils/helpers';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute } from '@angular/router';
import { BigNewsCardComponent } from '../../components/landing/big-news-card/big-news-card.component';
import { SmallNewsCardComponent } from '../../components/landing/small-news-card/small-news-card.component';
import { SideNewsListComponent } from '../../components/landing/side-news-list/side-news-list.component';
import { SidebarComponent } from '../../components/landing/sidebar/sidebar.component';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    BigNewsCardComponent,
    SmallNewsCardComponent,
    SideNewsListComponent,
    SidebarComponent,
    PaginationComponent,
    NgFor,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  data: Article[] = [];
  latestArticles: Article[] = [];
  category: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  ALL_CATEGORIES = CATEGORIES;
  findMostUsedSubCategories = findMostUsedSubCategories;
  findColorForCategory = findColorForCategory;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category') || '';

    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.loadLatestArticles();
    });
  }

  trackById(index: number, item: Article): number {
    return item.getId();
  }

  private loadLatestArticles(page: number = 1): void {
    this.newsService.getNews(this.category, 20, page).subscribe((data: any) => {
      this.latestArticles = data.items.map(
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
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
    });
  }

  onPageChange(page: number): void {
    this.loadLatestArticles(page);
  }
}
