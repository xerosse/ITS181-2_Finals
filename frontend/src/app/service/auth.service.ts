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
  private apiUrl = 'http://localhost:18080/api';
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(private http: HttpClient) {
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    this.checkCurrentUser();
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
    this.http.get<LoginResponse>(`${this.apiUrl}/current-user`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.currentUserSubject.next(response);
            if (this.isBrowser) {
              localStorage.setItem('currentUser', JSON.stringify(response));
            }
          }
        },
        error: () => {
          if (this.isBrowser) {
            const stored = localStorage.getItem('currentUser');
            if (stored) {
              try {
                this.currentUserSubject.next(JSON.parse(stored));
              } catch (e) {
                localStorage.removeItem('currentUser');
              }
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
