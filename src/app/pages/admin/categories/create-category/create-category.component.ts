import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateCategoryForm } from '../../../../types/category';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { SweetalertService } from '../../../../services/sweetalert.service';


@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  category: CreateCategoryForm = {
    title: '',
    description: '',
    slug: ''
  };

  categoryService = inject(CategoryService);
  sweetalertService = inject(SweetalertService)
  router = inject(Router);

  handleSubmitForm() {
    if (!this.category.title) return alert('Nhập tên danh mục');
    if (!this.category.description) return alert('Cần nhập mô tả danh mục');
    this.categoryService
      .CreateCategory(this.category)
      .subscribe(() => this.router.navigate(['/admin/categories']));
      this.sweetalertService.success('Success', 'Thêm danh mục thành công!')
  }
}
