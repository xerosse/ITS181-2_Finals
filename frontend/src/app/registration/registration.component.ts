import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreeToTerms: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (!this.agreeToTerms) {
      this.errorMessage = 'Please agree to the terms and conditions';
      return;
    }

    if (this.name && this.email && this.password) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.register(this.name, this.email, this.password).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Registration successful! Logging you in...';
          
          // Auto-login after 1 second
          setTimeout(() => {
            this.authService.login(this.email, this.password).subscribe({
              next: (loginResponse) => {
                if (loginResponse.success) {
                  this.router.navigate(['/home']);
                } else {
                  this.router.navigate(['/login']);
                }
              },
              error: () => {
                this.router.navigate(['/login']);
              }
            });
          }, 1000);
        },
        error: (error) => {
          this.isLoading = false;
          
          if (error.status === 409) {
            this.errorMessage = 'Email already exists. Please use a different email.';
          } else if (error.status === 400) {
            this.errorMessage = error.error?.message || 'Invalid registration data. Please check your inputs.';
          } else if (error.status === 0) {
            this.errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
          } else if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
          
          console.error('Registration error:', error);
        }
      });
    }
  }
}
