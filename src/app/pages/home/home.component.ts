import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductsListComponent } from '../../components/products-card/products-card.component';
import { ProductService } from "../../services/product.service";
import { Product } from "../../types/product";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent, 
    ProductsListComponent, 
    CommonModule, 
    RouterOutlet,
    NgFor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Product[] = [];
  productService = inject(ProductService)

  ngOnInit(): void{
    this.productService
    .getProductList()
    .subscribe((products) => (this.products = products))
  }

}
