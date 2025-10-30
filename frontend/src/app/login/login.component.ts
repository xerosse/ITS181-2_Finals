import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      console.log('Login attempt:', {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      });
      
      // TODO: Add actual authentication logic here
      // For now, just navigate to home
      // this.router.navigate(['/home']);
      
      alert('Login functionality to be implemented');
    }
  }
}