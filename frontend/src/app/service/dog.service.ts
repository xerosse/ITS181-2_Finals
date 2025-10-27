import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Dog } from '../model/dog';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:18080/api';
   }

  public addDog(dog: Dog): Observable<Dog> {      
      // check if path is single, wrap in array
      if (!Array.isArray(dog.image_paths)) {
        dog.image_paths = [dog.image_paths]
      }

      return this.http.post<Dog>(this.apiUrl + '/add-dog', dog);
  }
}
