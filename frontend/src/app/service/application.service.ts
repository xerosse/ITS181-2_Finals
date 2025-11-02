import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../model/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:18080/api';
  }

  public getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl + '/applications');
  }

  public getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(this.apiUrl + '/show-application/' + id);
  }

  public addApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl + '/add-application', application);
  }

  public updateApplication(id: number, application: Application): Observable<Application> {
    return this.http.put<Application>(this.apiUrl + '/update-application/' + id, application);
  }

  public deleteApplication(id: number): Observable<void> {
    return this.http.get<void>(this.apiUrl + '/delete-application/' + id);
  }
}
