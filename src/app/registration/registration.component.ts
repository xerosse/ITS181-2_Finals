import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!this.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    if (this.name && this.email && this.password) {
      console.log('Registration attempt:', {
        name: this.name,
        email: this.email,
        password: this.password
      });
      
      // TODO: Add actual registration logic here
      alert('Registration functionality to be implemented');
      
      // Navigate to login after successful registration
      // this.router.navigate(['/login']);
    }
  }
}
