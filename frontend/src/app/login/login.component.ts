import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.email && this.password) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            // Navigate based on role
            if (response.role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.errorMessage = response.message || 'Invalid email or password';
          }
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 0) {
            this.errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
          } else {
            this.errorMessage = 'Login failed. Please check your credentials and try again.';
          }
          console.error('Login error:', error);
        }
      });
    }
  }
}