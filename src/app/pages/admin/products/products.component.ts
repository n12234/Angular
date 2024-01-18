import { Component, inject } from '@angular/core';
import { Product } from '../../../types/product';
import { ProductService } from '../../../services/product.service';
import { NgFor } from '@angular/common';
import { DescriptionPipe } from "../../../pipes/description.pipe";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, DescriptionPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [];
  productService = inject(ProductService)

  ngOnInit(): void{
    this.productService
    .getProductListAdmin()
    .subscribe((products) => (this.products = products))
    }

    deleteProduct(id: number): void {
      if (window.confirm('Bạn có muốn xoá sp này không?')) {
        this.productService
          .removeProduct(id)
          .subscribe(
            () =>
              (this.products = this.products.filter(
                (product) => product.id !== id
              ))
          );
      }
    }

  }

