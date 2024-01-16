import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CreateProductForm } from '../../../types/product';
import { FormsModule } from "@angular/forms";
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  product: CreateProductForm = {
    title: '',
    description: '',
    image: '',
    category: '',
    price: 0,
  };

  productService = inject(ProductService);
  router = inject(Router);

  handleSubmitForm() {
    if (!this.product.title) return alert('Them ten san pham');
    this.productService
      .createProduct(this.product)
      .subscribe(() => this.router.navigate(['/admin/products']));
  }
}
