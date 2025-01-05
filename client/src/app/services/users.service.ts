import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  login: (email: string, password: string) => void = (email, password) => {
    return this.httpClient.post(`${API_URL}/Users/Login.controller.php`, {
      email,
      password,
    });
  };

  register(data: User) {
    return this.httpClient.post(
      `${API_URL}/Users/Register.controller.php`,
      data
    );
  }
}
