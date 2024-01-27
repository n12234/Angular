import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CreateCategoryForm } from '../types/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private apiUrl = 'http://localhost:3000/categories';

  http = inject(HttpClient);

  getCategoryListAll(): Observable<any> {
    return this.http.get<any[]>('http://localhost:3000/categories/list');
  }

  getCategoryList(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCategories(): Observable<string[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<string[]>(url);
  }

  categoryProduct(category: CreateCategoryForm) {
    return this.http.post<Category>(
      'http://localhost:3000/categories/',
      category
    );
  }

  getCategoryDetail(_id: string) {
    return this.http.get<Category>('http://localhost:3000/categories/' + _id);
  }

  removeCategory(_id: string) {
    return this.http.delete<Category>('http://localhost:3000/categories/' + _id);
  }

  updateCategory(categoryId: string, category: CreateCategoryForm) {
    return this.http.put<Category>(
      'http://localhost:3000/categories/' + categoryId,
      category
    );
  }
}
