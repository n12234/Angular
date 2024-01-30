import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CreateCategoryForm } from '../types/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private apiUrl = 'http://localhost:8000/categories';

  http = inject(HttpClient);

  getCategoryListAll(): Observable<any> {
    return this.http.get<any[]>('https://nodejs-rose-psi.vercel.app/categories/list');
  }

  getCategoryList(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCategories(): Observable<string[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<string[]>(url);
  }

  CreateCategory(category: CreateCategoryForm) {
    return this.http.post<Category>(
      'https://nodejs-rose-psi.vercel.app/categories/',
      category
    );
  }

  getCategoryDetail(_id: string) {
    return this.http.get<Category>('https://nodejs-rose-psi.vercel.app/categories/' + _id);
  }

  removeCategory(_id: string) {
    return this.http.delete<Category>('https://nodejs-rose-psi.vercel.app/categories/' + _id);
  }

  updateCategory(categoryId: string, category: CreateCategoryForm) {
    return this.http.put<Category>(
      'https://nodejs-rose-psi.vercel.app/categories/' + categoryId,
      category
    );
  }
}
