import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  apiUrl: string;
  private httpOptions = { withCredentials: true };

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:18080/api/articles';
  }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  public getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.apiUrl + '/' + id);
  }

  public addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article, this.httpOptions);
  }

  public updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(this.apiUrl + '/' + id, article, this.httpOptions);
  }

  public deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id, this.httpOptions);
  }
}
