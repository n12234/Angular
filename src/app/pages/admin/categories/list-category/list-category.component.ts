import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { SweetalertService } from '../../../../services/sweetalert.service';

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
  sweetalertService = inject(SweetalertService)

  ngOnInit(): void {
    this.categoryService
      .getCategoryListAll()
      .subscribe((categories) => (this.categories = categories));
  }

  async deleteCategory(_id: string){
    const confirmed = await this.sweetalertService.confirm('Bạn có muốn xoá không?', 'This action cannot be undone.');
    try {
      if (confirmed) {
        this.categoryService
          .removeCategory(_id)
          .subscribe(
            () =>
              (this.categories = this.categories.filter(
                (category) => category._id !== _id
              ))
          );
          this.sweetalertService.success('Success', 'Update thành công!')
      }
    } catch (error) {
      this.sweetalertService.error('Error', 'Xoá không thành công!')
    }
  }
}
