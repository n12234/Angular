import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from "../types/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = "https://fakestoreapi.com/products";
  http = inject(HttpClient)
  constructor() { }

  getProductList() {
    return this.http.get<Product[]>(this.apiUrl)
  }
}
