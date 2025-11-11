import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    // Trigger check if not already done
    this.authService.checkCurrentUser();
    
    return this.authService.currentUser$.pipe(
      // Skip the initial null value, wait for actual response
      filter(user => user !== null),
      take(1),
      map(user => {
        console.log('AdminGuard checking user:', user);
        
        // Allow access if user is admin
        if (user.success && user.role === 'ADMIN') {
          return true;
        }
        
        // If not logged in, redirect to login
        if (!user.success) {
          alert('You must be logged in as an admin to access this page.');
          return this.router.createUrlTree(['/login']);
        }
        
        // If logged in but not admin, redirect to home
        alert('Access denied. Admin privileges required.');
        return this.router.createUrlTree(['/home']);
      })
    );
  }
}
