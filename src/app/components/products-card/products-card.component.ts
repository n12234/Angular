import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.css'
})
export class ProductsListComponent {
  @Input() productChill!: any;
}
