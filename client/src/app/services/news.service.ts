import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../environment';
import { CATEGORIES } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(category?: string) {
    return this.http.get(`${API_URL}/News/GetAllNews.controller.php`, {
      params: category ? { category } : {},
    });
  }

  getAllCategoriesNews() {
    const requests = CATEGORIES.map((category) => this.getNews(category.name));
    return requests;
  }
}
