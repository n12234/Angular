import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CreateProductForm, Product } from "../types/product";

const options = {
  headers: {
    accept: 'application/json',
    // Authorization:
    //   'Bearer ',
  },
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient)
  constructor() { }

  getProductList() {
    return this.http.get<Product[]>('http://localhost:3000/products')
  }

  getProductDetail(id: number) {
    return this.http.get<Product>('http://localhost:3000/products/' + id);
  }

  getProductListAdmin() {
    return this.http.get<Product[]>('http://localhost:3000/products', options)
  }

  removeProduct(id: number) {
    return this.http.delete<Product>('http://localhost:3000/products/' + id);
  }

  createProduct(product: CreateProductForm) {
    return this.http.post<Product>(
      'http://localhost:3000/products/',
      product
    );
  }

  updateProduct(productId: number, product: CreateProductForm) {
    return this.http.put<Product>(
      'http://localhost:3000/products/' + productId,
      product
    );
  }
}
