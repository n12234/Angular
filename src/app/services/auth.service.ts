import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm, LoginFormResponse } from '../types/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  constructor() {}

  login(user: LoginForm) {
    return this.http.post<LoginFormResponse>(
      'http://localhost:3000/login',
      user
    );
  }
}