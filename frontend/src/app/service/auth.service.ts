import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

export interface LoginResponse {
  success: boolean;
  message: string;
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

export interface Account {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Application {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  submittedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;
  private isInitialized = false;

  constructor(private http: HttpClient) {
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    // Don't call checkCurrentUser in constructor for SSR compatibility
    if (this.isBrowser) {
      this.checkCurrentUser();
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap(response => {
          if (response.success) {
            this.currentUserSubject.next(response);
            if (this.isBrowser) {
              localStorage.setItem('currentUser', JSON.stringify(response));
            }
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return of({ success: false, message: 'Login failed' });
        })
      );
  }

  register(name: string, email: string, password: string): Observable<any> {
    const account = {
      id: 0,
      name,
      email,
      password,
      role: 'USER'
    };
    return this.http.post(`${this.apiUrl}/add-account`, account);
  }

  logout(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.currentUserSubject.next(null);
          if (this.isBrowser) {
            localStorage.removeItem('currentUser');
          }
        })
      );
  }

  checkCurrentUser(): void {
    if (this.isInitialized) return; // Prevent multiple checks
    this.isInitialized = true;
    
    console.log('Checking current user...');
    this.http.get<LoginResponse>(`${this.apiUrl}/current-user`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log('Current user response:', response);
          if (response.success) {
            this.currentUserSubject.next(response);
            if (this.isBrowser) {
              localStorage.setItem('currentUser', JSON.stringify(response));
            }
          } else {
            console.log('Response not successful, clearing user');
            this.currentUserSubject.next({ success: false, message: 'Not logged in' });
            if (this.isBrowser) {
              localStorage.removeItem('currentUser');
            }
          }
        },
        error: (err) => {
          console.error('Error checking current user:', err);
          this.currentUserSubject.next({ success: false, message: 'Not logged in' });
          if (this.isBrowser) {
            localStorage.removeItem('currentUser');
          }
        }
      });
  }

  getCurrentUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value?.success || false;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'ADMIN';
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/accounts`, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Error fetching accounts:', error);
          return of([]);
        })
      );
  }

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applications`, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Error fetching applications:', error);
          return of([]);
        })
      );
  }
}
