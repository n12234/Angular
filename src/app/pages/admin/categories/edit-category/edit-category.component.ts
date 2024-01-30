import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateCategoryForm } from '../../../../types/category';
import { CategoryService } from '../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetalertService } from '../../../../services/sweetalert.service';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  categoryId: string | undefined;
  category: CreateCategoryForm = {
    title: '',
    description: '',
    slug: ''
  };

  sweetalertService = inject(SweetalertService)
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.categoryId = param['id'];
      return this.getCategoryById();
    });
  }

  getCategoryById() {
    if (!this.categoryId) return;
    return this.categoryService
      .getCategoryDetail(this.categoryId)
      .subscribe((category) => (this.category = category));
  }

  handleSubmitForm() {
    if (!this.categoryId) return;
    if (!this.category.title) return alert('Nhập tên sản phẩm');
    if (!this.category.description) return alert('Mô tả không được bỏ trống');
    this.categoryService
      .updateCategory(this.categoryId, this.category)
      .subscribe(() => this.router.navigate(['/admin/categories']));
      this.sweetalertService.success('Success', 'Update thành công!')
  }
}
