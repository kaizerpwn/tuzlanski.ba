import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${API_URL}/Users/Login.controller.php`, {
      email,
      password,
    });
  }

  register(data: User) {
    console.log('test');
    return this.http.post(`${API_URL}/Users/Register.controller.php`, data);
  }

  getAllUsers() {
    return this.http.get(`${API_URL}/Users/GetAllUsers.controller.php`);
  }
}
