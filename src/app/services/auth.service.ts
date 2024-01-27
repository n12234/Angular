import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm, LoginFormResponse } from '../types/auth';
import { Observable, tap } from 'rxjs';
import { CreateUserForm, User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';

  private tokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  getAllUserList(): Observable<any> {
    return this.http.get<any[]>('http://localhost:3000/users');
  }

  getUserDetail(_id: string) {
    return this.http.get<User>('http://localhost:3000/users/' + _id);
  }

  updateUser(userId: string, user: CreateUserForm) {
    return this.http.put<User>(
      'http://localhost:3000/users/' + userId,
      user
    );
  }

  login( email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap((response: any) => {
        const token = response.accessToken;
        this.setToken(token);
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {name, email, password});
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    this.removeToken();
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}