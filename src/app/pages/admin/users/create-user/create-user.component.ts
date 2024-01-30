import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SweetalertService } from '../../../../services/sweetalert.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  username = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService, 
    private sweetalertService:SweetalertService,
    private router: Router) {}
  
    createUser(): void {
    this.authService.createUser(this.username, this.email, this.password).subscribe(
      (res) => {
        this.router.navigate(['/admin/users']);
        this.sweetalertService.success('Success', 'Add user thành công!')
      },
        error => {
          this.sweetalertService.error('Error', 'Add user thất bại!')
        }
      );
    }
}
