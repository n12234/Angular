import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Category } from "../../types/category";
import { NgFor } from '@angular/common';
import { ProductsCardComponent } from '../../components/products-card/products-card.component';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgFor, ProductsCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  product!: Product;
  relatedProduct!: Product[];
  id!: string;
  category!: string;

  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.productService.getProductDetail(this.id).subscribe(
      (data) => {
        this.product = data;
        this.category = data.category
        
        this.productService.getProductList().subscribe((products) => {
          const result = products.filter((item) => {
           return item.category === this.product.category && item._id !== this.id
          })
          this.relatedProduct = result;

        })
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
}
