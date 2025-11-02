import { Component, OnInit } from '@angular/core';
import { Dog } from '../model/dog';
import { DogService } from '../service/dog.service';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.css']
})
export class AdoptComponent implements OnInit {
  dogs: Dog[] = [];
  filteredDogs: Dog[] = [];
  
  // Filter options
  searchName: string = '';
  filterArrivalDate: string = 'Any';
  filterBreed: string = 'Any';
  filterAge: string = 'Any';
  filterSize: string = 'Any';
  filterSex: string = 'Any';
  filterWeight: string = 'Any';
  filterStatus: string = 'Any';

  // Unique filter values
  breeds: string[] = [];
  
  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.loadDogs();
  }

  loadDogs() {
    this.dogService.getDogs().subscribe(
      data => {
        this.dogs = data;
        this.filteredDogs = data;
        this.extractUniqueValues();
      }
    );
  }

  extractUniqueValues() {
    this.breeds = ['Any', ...new Set(this.dogs.map(dog => dog.breed).filter(breed => breed))];
  }

  applyFilters() {
    this.filteredDogs = this.dogs.filter(dog => {
      const matchesName = !this.searchName || 
        dog.name.toLowerCase().includes(this.searchName.toLowerCase());
      
      const matchesBreed = this.filterBreed === 'Any' || dog.breed === this.filterBreed;
      const matchesAge = this.filterAge === 'Any' || this.checkAgeRange(dog.age);
      const matchesSize = this.filterSize === 'Any' || dog.size === this.filterSize;
      const matchesSex = this.filterSex === 'Any' || dog.sex === this.filterSex;
      const matchesWeight = this.filterWeight === 'Any' || this.checkWeightRange(dog.weight);
      const matchesStatus = this.filterStatus === 'Any' || dog.status === this.filterStatus;

      return matchesName && matchesBreed && matchesAge && matchesSize && 
             matchesSex && matchesWeight && matchesStatus;
    });
  }

  checkAgeRange(age: number): boolean {
    switch(this.filterAge) {
      case '0-1': return age >= 0 && age <= 1;
      case '1-3': return age > 1 && age <= 3;
      case '3-7': return age > 3 && age <= 7;
      case '7+': return age > 7;
      default: return true;
    }
  }

  checkWeightRange(weight: number): boolean {
    switch(this.filterWeight) {
      case '0-10': return weight >= 0 && weight <= 10;
      case '10-25': return weight > 10 && weight <= 25;
      case '25-50': return weight > 25 && weight <= 50;
      case '50+': return weight > 50;
      default: return true;
    }
  }

  resetFilters() {
    this.searchName = '';
    this.filterArrivalDate = 'Any';
    this.filterBreed = 'Any';
    this.filterAge = 'Any';
    this.filterSize = 'Any';
    this.filterSex = 'Any';
    this.filterWeight = 'Any';
    this.filterStatus = 'Any';
    this.applyFilters();
  }
}
