import { Component, inject } from '@angular/core';
import { CreateProductForm } from '../../../types/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../types/category';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  productId: string | undefined;
  categories: Category[] = [];
  product: CreateProductForm = {
    title: '',
    description: '',
    image: '',
    category: '',
    price: 0,
    // count: ''
  };

  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  router = inject(Router);

  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      return this.getProductById();
    });

    this.categoryService
      .getCategoryList()
      .subscribe((categories) => (this.categories = categories));
  }

  getProductById() {
    if (!this.productId) return;
    return this.productService
      .getProductDetail(this.productId)
      .subscribe((product) => (this.product = product));
  }

  handleSubmitForm() {
    if (!this.productId) return;
    if (!this.product.title) return alert('Nhập tên sản phẩm');
    if (!this.product.price) return alert('Giá không được bỏ trống');
    if (!this.product.description) return alert('Mô tả không được bỏ trống');
    if (!this.product.category) return alert('Cần chọn danh mục sản phẩm');
    this.productService
      .updateProduct(this.productId, this.product)
      .subscribe(() => this.router.navigate(['/admin/products']));
      alert('Update thành công!!!')
  }
}
