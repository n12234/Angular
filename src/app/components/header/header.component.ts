import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'HomePage'
  menuList = [
    {
      label: 'Home',
      path:'/'
    },
    {
      label: 'About',
      path: '/'
    },
    {
      label: 'Services',
      path: '/'
    },
    {
      label: 'Contact',
      path: '/'
    },
  ]
}
