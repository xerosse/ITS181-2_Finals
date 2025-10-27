import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Dog } from '../model/dog';
import { DogService } from '../service/dog.service';

@Component({
  selector: 'app-add-dog',
  templateUrl: './add-dog.component.html',
  styleUrl: './add-dog.component.css'
})
export class AddDogComponent {
  dog: Dog = new Dog();

  constructor(
    private dogService: DogService,
    private location: Location
  ) {}

  back(): void {
    this.location.back();
  }

  submit() {
    if (!this.dog.name || !this.dog.image_paths || !this.dog.age || !this.dog.sex
      || !this.dog.breed|| !this.dog.size || !this.dog.weight
    ) {
      alert('Incomplete details.');
      return;
    }

    this.dogService.addDog(this.dog)
      .subscribe(() => this.back());
  }

}
