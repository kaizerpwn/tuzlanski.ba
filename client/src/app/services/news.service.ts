import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(query: string) {
    return this.http.get(`${API_URL}/GetAllNews.controller.php?${query}`);
  }
}
