import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginForm } from '../../types/auth';
import { SweetalertService } from '../../services/sweetalert.service';

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
  private router: Router,
  private sweetalertService: SweetalertService
  ) {}

register(): void {
  this.authService.register(this.fullname, this.email, this.password).subscribe(
    (res) => {
      sessionStorage.setItem('token', JSON.stringify(res.accessToken));
      this.router.navigate(['/login']);
      this.sweetalertService.success('Success', 'Đăng kí thành công')
    },
      error => {
        this.sweetalertService.error('Error', 'Đăng kí không thành công, vui lòng kiểm tra lại!')
      }
    );
  }
}
