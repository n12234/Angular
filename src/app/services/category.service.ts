import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);

  getCategoryList() {
    return this.http.get<Category[]>(
      'http://localhost:3000/categories'
    );
  }
}
