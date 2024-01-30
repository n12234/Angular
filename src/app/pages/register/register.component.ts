import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginForm } from '../../types/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fullname =  '';
  email = '';
  password = '';

constructor(
  private authService: AuthService, 
  private router: Router) {}

register(): void {
  this.authService.register(this.fullname, this.email, this.password).subscribe(
    (res) => {
      sessionStorage.setItem('token', JSON.stringify(res.accessToken));
      this.router.navigate(['/login']);
      alert('Đăng kí thành công')
    },
      error => {
        console.error('Đăng ký không thành công:', error);
        alert('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin đăng ký.');
      }
    );
  }
}
