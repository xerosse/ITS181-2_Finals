import { Component } from '@angular/core';
import { Dog } from '../model/dog';
import { DogService } from '../service/dog.service';

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

  constructor(private dogService: DogService) { }

  ngOnInit(): void {
    this.getDogs();
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
}
