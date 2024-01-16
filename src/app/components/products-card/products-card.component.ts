import { Component, Input } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Product } from "../../types/product";

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.css'
})
export class ProductsCardComponent {
  @Input() product!: Product;
}
