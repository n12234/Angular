import { Component, inject } from '@angular/core';
import { Product } from '../../../types/product';
import { ProductService } from '../../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { DescriptionPipe } from '../../../pipes/description.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoginFormResponse } from '../../../types/auth';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgFor,
    DescriptionPipe,
    RouterLink,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  searchControl = new FormControl('');
  categories: string[] = [];
  selectedCategories: string[] = [];
  products: any[] = [];
  // filterForm!: FormGroup;
  // pageSize = 3;
  // currentPage = 1;
  // pageCount = 1;
  // pages: number[] = [];

  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  constructor(private http: HttpClient) {}
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    // this.getProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadProducts(): void {
    this.productService
      .getProducts(this.selectedCategories)
      .subscribe((data) => {
        this.products = data;
      });
  }

  filterProductsByCategories(): void {
    this.loadProducts();
  }

  searchProducts(): void {
    const keyword = this.searchControl.value;
    if (keyword && typeof keyword === 'string') {
      this.productService.searchProducts(keyword).subscribe((data) => {
        this.products = data;
      });
    } else {
      this.products = [];
    }
  }

  // getProducts(): void {
  //   const apiUrl = `http://localhost:3000/products?page=${this.currentPage}&pageSize=${this.pageSize}`;

  //   this.http.get<any[]>(apiUrl).subscribe(
  //     (data) => {
  //       this.products = data;
  //       this.updatePageCount();
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  // updatePageCount(): void {
  //   this.pageCount = Math.ceil(this.products.length / this.pageSize);
  //   this.pages = Array.from({ length: this.pageCount }, (_, i) => i + 1);
  // }

  // goToPage(page: number): void {
  //   if (page >= 1 && page <= this.pageCount) {
  //     this.currentPage = page;
  //     this.getProducts();
  //   }
  // }

  // nextPage(): void {
  //   this.goToPage(this.currentPage + 1);
  // }

  // prevPage(): void {
  //   this.goToPage(this.currentPage - 1);
  // }

  deleteProduct(_id: string): void {
    try {
      if (window.confirm('Bạn có muốn xoá sp này không?')) {
        this.productService
          .removeProduct(_id)
          .subscribe(
            () =>
              (this.products = this.products.filter(
                (product) => product._id !== _id
              ))
          );
          alert('Xoá thành công!!!');
      }
    } catch (error) {
      console.log(error);
      
    }
  }
}
