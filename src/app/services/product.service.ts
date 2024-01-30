import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CreateProductForm, Product, ProductResponse } from "../types/product";
import { Category } from "../types/category";
import { Observable } from 'rxjs';

// const chToken = {
//   headers: {
//     accept: 'application/json',
//     Authoization: 
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWZhOGE3Yzc5ODEzOTg5Nzk5Mjc4ZCIsImlhdCI6MTcwNjE3MzU3NiwiZXhwIjoxNzA2MjU5OTc2fQ.uXL0eTvSGx3dR0dwfp-0BgaUSbu_TMW8as28yCQiPO4'
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // apiAdminUrl = 'http://localhost:8000/api/products'
  apiAdminUrl = 'https://nodejs-rose-psi.vercel.app/api/products'

  http = inject(HttpClient)
  constructor() { }

  getProductList() {
    return this.http.get<Product[]>('https://nodejs-rose-psi.vercel.app/api/products')
  }

  getProducts(categories: string[] | string): Observable<any[]> {
    const categoryArray = Array.isArray(categories) ? categories : [categories];
    const categoryParam = categoryArray.length > 0 ? `?category=${categoryArray.join(',')}` : '';
    const url = `${this.apiAdminUrl}${categoryParam}`;
    return this.http.get<any[]>(url);
  }

  getProductDetail(_id: string) {
    return this.http.get<Product>('https://nodejs-rose-psi.vercel.app/api/products/' + _id);
  }

  searchProducts(keyword: string): Observable<any> {
    const url = `${this.apiAdminUrl}/search?keyword=${keyword}`;
    return this.http.get(url);
  }

  removeProduct(_id: string) {
    return this.http.delete<Product>('https://nodejs-rose-psi.vercel.app/api/products/' + _id);
  }

  createProduct(product: CreateProductForm) {
    return this.http.post<Product>(
      'https://nodejs-rose-psi.vercel.app/api/products/',
      product
    );
  }

  updateProduct(productId: string, product: CreateProductForm) {
    return this.http.put<Product>(
      'https://nodejs-rose-psi.vercel.app/api/products/' + productId,
      product
    );
  }
}
