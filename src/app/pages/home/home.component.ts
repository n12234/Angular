import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductsCardComponent } from '../../components/products-card/products-card.component';
import { ProductService } from "../../services/product.service";
import { Product } from "../../types/product";
import { ProductDetailComponent } from "../product-detail/product-detail.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent, 
    ProductsCardComponent, 
    ProductDetailComponent,
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

  ngOnChanges() {
    console.log('1 -ngOnChanges');
  }


  ngOnInit(): void{
    this.productService
    .getProductList()
    .subscribe((products) => (this.products = products))

    console.log(' 2- ngOnInit');

  }

  ngDoCheck() {
    console.log('3 -ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('4 -ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('5 -ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('6 -ngAfterViewInit');
  }
  ngAfterViewChecked() {
    console.log('7 -ngAfterViewChecked');
  }
  ngOnDestroy() {
    console.log('8- ngOnDestroy');
  }
}
