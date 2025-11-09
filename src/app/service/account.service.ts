import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:18080/api';
  }

  public getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl + '/accounts');
  }

  public getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(this.apiUrl + '/show-account/' + id);
  }

  public addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl + '/add-account', account);
  }

  public updateAccount(id: number, account: Account): Observable<Account> {
    return this.http.put<Account>(this.apiUrl + '/update-account/' + id, account);
  }

  public deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/delete-account/' + id);
  }
}
