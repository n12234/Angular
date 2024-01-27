import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  users: any[] = [];
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService
      .getAllUserList()
      .subscribe((users) => (this.users = users));
  }
}
