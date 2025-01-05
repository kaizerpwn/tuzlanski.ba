import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { forkJoin } from 'rxjs';
import { CATEGORIES } from '../../utils/constants';
import { BigNewsCardComponent } from '../../components/big-news-card/big-news-card.component';
import { SideNewsListComponent } from '../../components/side-news-list/side-news-list.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SmallNewsCardComponent } from '../../components/small-news-card/small-news-card.component';
import { CategoryNavComponent } from '../../components/category-nav/category-nav.component';
import { Article } from '../../models/Article';
import {
  findColorForCategory,
  findMostUsedSubCategories,
} from '../../utils/helpers';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BigNewsCardComponent,
    SideNewsListComponent,
    SidebarComponent,
    SmallNewsCardComponent,
    CategoryNavComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  data: { [key: string]: Article[] } = {};
  latestArticles: Article[] = [];

  ALL_CATEGORIES = CATEGORIES;
  findMostUsedSubCategories = findMostUsedSubCategories;
  findColorForCategory = findColorForCategory;

  constructor(private newsService: NewsService) {
    this.loadLatestArticles();
    this.loadNewsByCategory();
  }

  private loadLatestArticles(): void {
    this.newsService.getNews('', 7).subscribe((data: any) => {
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

  private loadNewsByCategory(): void {
    const requests = this.newsService.getAllCategoriesNews();
    forkJoin(requests).subscribe((data) => {
      this.data = this.mapNewsToCategories(data);
    });
  }

  private mapNewsToCategories(newsData: any[]): { [key: string]: Article[] } {
    return CATEGORIES.reduce(
      (acc: { [key: string]: Article[] }, category, index) => {
        acc[category.name] = newsData[index].map(
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
        return acc;
      },
      {}
    );
  }
}
