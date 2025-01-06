import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../environment';
import { CATEGORIES } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(category?: string, size: number = 10, page: number = 1) {
    const params: any = { size: size.toString(), page: page.toString() };

    if (category) {
      params.category = category;
    }

    return this.http.get(`${API_URL}/News/GetAllNews.controller.php`, {
      params,
    });
  }

  getAllCategoriesNews() {
    const requests = CATEGORIES.map((category) =>
      this.getNews(category.name, 4)
    );
    return requests;
  }

  getNewsById(id: number) {
    return this.http.get(`${API_URL}/News/GetNewsById.controller.php`, {
      params: { id: id.toString() },
    });
  }

  deleteNews(id: number) {
    return this.http.delete(`${API_URL}/News/DeleteNews.controller.php`, {
      params: { id: id.toString() },
    });
  }

  createNews(formData: FormData) {
    return this.http.post(
      `${API_URL}/News/CreateNews.controller.php`,
      formData
    );
  }

  updateNews(formData: FormData) {
    return this.http.post(
      `${API_URL}/News/UpdateNews.controller.php`,
      formData
    );
  }
}
