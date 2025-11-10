import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface LoginResponse {
  success: boolean;
  message: string;
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:18080/api';
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkCurrentUser();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap(response => {
          if (response.success) {
            this.currentUserSubject.next(response);
            localStorage.setItem('currentUser', JSON.stringify(response));
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
          localStorage.removeItem('currentUser');
        })
      );
  }

  checkCurrentUser(): void {
    this.http.get<LoginResponse>(`${this.apiUrl}/current-user`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.currentUserSubject.next(response);
            localStorage.setItem('currentUser', JSON.stringify(response));
          }
        },
        error: () => {
          const stored = localStorage.getItem('currentUser');
          if (stored) {
            try {
              this.currentUserSubject.next(JSON.parse(stored));
            } catch (e) {
              localStorage.removeItem('currentUser');
            }
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
}
