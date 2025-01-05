import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class IntegrationsService {
  constructor(private http: HttpClient) {}

  getCount() {
    return this.http.get(`${API_URL}/Integrations/Count.controller.php`);
  }
}
