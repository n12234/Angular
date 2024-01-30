import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CreateProductForm } from '../../../types/product';
import { FormsModule } from "@angular/forms";
import { NgFor } from "@angular/common";
import { Category } from "../../../types/category";
import { CategoryService } from '../../../services/category.service';
import { SweetalertService } from '../../../services/sweetalert.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  categories: Category[] = [];
  product: CreateProductForm = {
    title: '',
    description: '',
    category: '',
    price: 0,
    image: '',
  };

  sweetalertService = inject(SweetalertService)
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  router = inject(Router);

  ngOnInit(): void {
    this.categoryService
      .getCategoryList()
      .subscribe((categories) => (this.categories = categories));
  }

  handleSubmitForm() {
    if (!this.product.title) return alert('Nhập tên sản phẩm');
    if (!this.product.price) return alert('Nhập giá sản phẩm');
    if (!this.product.description) return alert('Cần nhập mô tả sản phẩm');
    if (!this.product.category) return alert('Chọn danh mục sản phẩm');
    this.productService
      .createProduct(this.product)
      .subscribe(() => this.router.navigate(['/admin/products']));
      this.sweetalertService.success('Success', 'Thêm sản phẩm thành công!')
  }
}
