import { Component } from '@angular/core';
import { Dog } from '../model/dog';
import { DogService } from '../service/dog.service';
import { Article } from '../model/article';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  dogs: Dog[] = [];
  topDogs: Dog[] = [];
  latestArrival: Dog = new Dog();
  latestAdopted: Dog = new Dog();

  latestArticles: Article[] = [];

  constructor(
    private dogService: DogService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.getDogs();
    this.getArticles();
  }

  getDogs(): void {
    this.dogService.getDogs()
      .subscribe(dogs => {
        this.dogs = dogs;
        this.topDogs = this.dogs.slice(1, 5);
        this.latestArrival = this.getLatestArrivalDog(dogs);
        this.latestAdopted = this.getLatestAdoptedDog(dogs);
    });
  }

  getLatestArrivalDog(dogs: Dog[]): any {
    if (!dogs || dogs.length === 0) return null;

    return dogs.reduce((latest, current) =>
      new Date(current.arrived_date) > new Date(latest.arrived_date)
        ? current
        : latest
    );
  }

  getLatestAdoptedDog(dogs: Dog[]): any {
    if (!dogs || dogs.length === 0) return null; 
    
    return dogs.reduce((latest, current) => 
      new Date(current.adopted_date!) > new Date(latest.adopted_date!) 
      ? current 
      : latest 
    );
  }

  getArticles(): void {
    this.articleService.getArticles()
      .subscribe(articles => {
        this.latestArticles = this.getLatestArticles(articles);
        this.latestArticles = this.latestArticles.slice(0, 3);
      });
  }

  getLatestArticles(articles: Article[]): Article[] {
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}
