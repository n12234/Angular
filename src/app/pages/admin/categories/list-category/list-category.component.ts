import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent {
  categories: any[] = [];
  categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.categoryService
      .getCategoryListAll()
      .subscribe((categories) => (this.categories = categories));
  }

  deleteCategory(_id: string): void {
    if (window.confirm('Bạn có muốn xoá danh mục này không?')) {
      this.categoryService
        .removeCategory(_id)
        .subscribe(
          () =>
            (this.categories = this.categories.filter(
              (category) => category._id !== _id
            ))
        );
    }
    alert('Xoá thành công!!!');
  }
}
