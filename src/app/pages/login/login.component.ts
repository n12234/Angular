import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { SweetalertService } from '../../services/sweetalert.service';

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
    private router: Router,
    private sweetalertService: SweetalertService
    ) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (res) => {
        sessionStorage.setItem('token', JSON.stringify(res.accessToken));
        this.router.navigate(['/admin/products']);
        this.sweetalertService.success('Success', 'Đăng nhập thành công')
      },
      error => {
        this.sweetalertService.error('Error', 'Đăng nhập không thành công, vui lòng kiểm tra lại!')
      }
    );

  }
}
