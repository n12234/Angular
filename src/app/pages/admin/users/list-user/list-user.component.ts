import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SweetalertService } from '../../../../services/sweetalert.service';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  users: any[] = [];
  authService = inject(AuthService);
  sweetalertService = inject(SweetalertService)

  ngOnInit(): void {
    this.authService
      .getAllUserList()
      .subscribe((users) => (this.users = users));
  }

  async onDeleteUser(_id: string) {
    const confirmed = await this.sweetalertService.confirm('Bạn có muốn xoá không?', 'This action cannot be undone.');
    try {
      if (confirmed) {
        this.authService
          .removeProduct(_id)
          .subscribe(
            () =>
              (this.users = this.users.filter(
                (user) => user._id !== _id
              ))
          );
          this.sweetalertService.success('Success', 'Xoá thành công!')
      }
    } catch (error) {
      this.sweetalertService.error('Error', 'Xoá không thành công!')
    }
  }
}
