import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../types/auth';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    email = '';
    password = '';
  
  constructor(
    private authService: AuthService, 
    private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (res) => {
        sessionStorage.setItem('token', JSON.stringify(res.accessToken));
        this.router.navigate(['/admin/products']);
        alert('Đăng nhập thành công!!!')
      },
      error => {
        console.error('Đăng nhập không thành công:', error);
        alert('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.');
      }
    );

  }
}
