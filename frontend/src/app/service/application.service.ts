import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../model/application';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  apiUrl: string;
  private httpOptions = { withCredentials: true };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl + '/applications', { withCredentials: true });
  }

  public getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(this.apiUrl + '/show-application/' + id, { withCredentials: true });
  }

  public addApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl + '/add-application', application, this.httpOptions);
  }

  public updateApplication(id: number, application: Application): Observable<Application> {
    return this.http.put<Application>(this.apiUrl + '/update-application/' + id, application, { withCredentials: true });
  }

  public deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/delete-application/' + id, { withCredentials: true });
  }
}
