import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Dog } from '../model/dog';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  apiUrl: string;
  private httpOptions = { withCredentials: true };

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:18080/api';
  }

  public getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.apiUrl + '/dogs');
  }

  public getDog(id: number): Observable<Dog> {
    return this.http.get<Dog>(this.apiUrl + '/show-dog/' + id);
  }

  public addDog(dog: Dog): Observable<Dog> {      
      // check if path is single, wrap in array
      if (!Array.isArray(dog.image_paths)) {
        dog.image_paths = [dog.image_paths]
      }

      return this.http.post<Dog>(this.apiUrl + '/add-dog', dog, this.httpOptions);
  }

  public updateDog(id: number, dog: Dog): Observable<Dog> {
    if (!Array.isArray(dog.image_paths)) {
      dog.image_paths = [dog.image_paths]
    }
    return this.http.put<Dog>(this.apiUrl + '/update-dog/' + id, dog, this.httpOptions);
  }

  public deleteDog(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/delete-dog/' + id, this.httpOptions);
  }
}
