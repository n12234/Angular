import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditUserForm } from '../../../../types/user';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { SweetalertService } from '../../../../services/sweetalert.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  userId: string | undefined;
  user: EditUserForm = {
    username: '',
    email: '',
  };

  sweetalertService = inject(SweetalertService)
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.userId = param['id'];
      return this.getCategoryById();
    });
  }

  getCategoryById() {
    if (!this.userId) return;
    return this.authService
      .getUserDetail(this.userId)
      .subscribe((user) => (this.user = user));
  }

  handleSubmitForm() {
    if (!this.userId) return;
    if (!this.user.email) return alert('Nhập email');
    this.authService
      .updateUser(this.userId, this.user)
      .subscribe(() => this.router.navigate(['/admin/users']));
      this.sweetalertService.success('Success', 'Update thành công!')
  }
}
