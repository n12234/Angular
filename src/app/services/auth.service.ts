import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { EditUserForm, User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'https://nodejs-rose-psi.vercel.app/auth';

  private tokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  getAllUserList(): Observable<any> {
    return this.http.get<any[]>('https://nodejs-rose-psi.vercel.app/users');
  }

  getUserDetail(_id: string) {
    return this.http.get<User>('https://nodejs-rose-psi.vercel.app/users/' + _id);
  }

  createUser(username: string, email: string, password: string): Observable<any> {
    return this.http.post('https://nodejs-rose-psi.vercel.app/users', {username, email, password})
  }

  updateUser(userId: string, user: EditUserForm) {
    return this.http.put<User>(
      'https://nodejs-rose-psi.vercel.app/users/' + userId,
      user
    );
  }

  removeProduct(_id: string) {
    return this.http.delete<User>('https://nodejs-rose-psi.vercel.app/users/' + _id);
  }

  login( email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap((res: any) => {
        const token = res.accessToken;
        this.setToken(token);
      })
    );
  }

  register(fullname: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {fullname, email, password});
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