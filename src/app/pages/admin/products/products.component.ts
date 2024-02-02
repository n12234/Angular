import { Component, inject } from '@angular/core';
import { Product } from '../../../types/product';
import { ProductService } from '../../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { DescriptionPipe } from '../../../pipes/description.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SweetalertService } from '../../../services/sweetalert.service';
import { PaginationComponent } from "../pagination/pagination.component";

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
    PaginationComponent,
    NgxPaginationModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  // searchControl = new FormControl('');
  categories: string[] = [];
  // selectedCategories: string[] = [];
  products: any[] = [];
  totalProducts: number = 0;
  pageSize: number = 4;
  currentPage: number = 1;
  category: string = '';
  search: string = '';

  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  constructor(
    private sweetalertService: SweetalertService
  ) {}
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(page: number = 1): void {
    this.productService.getProducts(
        page, this.pageSize, 
        this.category, 
        this.search)
      .subscribe((data) => {
      this.products = data.products;
      this.totalProducts = data.totalProducts;
      this.currentPage = page;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }


  async deleteProduct(_id: string) {
    const confirmed = await this.sweetalertService.confirm(
      'Bạn có muốn xoá không?',
      'This action cannot be undone.'
    );
    try {
      if (confirmed) {
        this.productService
          .removeProduct(_id)
          .subscribe(
            () =>
              (this.products = this.products.filter(
                (product) => product._id !== _id
              ))
          );
        this.sweetalertService.success('Success', 'Xoá thành công!');
      }
    } catch (error) {
      this.sweetalertService.error('Error', 'Xoá không thành công!');
    }
  }
}
