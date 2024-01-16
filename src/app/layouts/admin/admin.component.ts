import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProductsComponent } from "../../pages/admin/products/products.component";
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet, 
    SidebarComponent, 
    ProductsComponent, 
    NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent{
}
