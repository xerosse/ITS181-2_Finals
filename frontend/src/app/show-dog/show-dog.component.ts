import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Dog } from '../model/dog';
import { DogService } from '../service/dog.service';

@Component({
  selector: 'app-show-dog',
  templateUrl: './show-dog.component.html',
  styleUrl: './show-dog.component.css'
})
export class ShowDogComponent implements OnInit {
  dog: Dog = new Dog();

  constructor(
    private route: ActivatedRoute,
    private dogService: DogService
  ) {}


  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        this.dogService.getDog(id).subscribe(data => {
          this.dog = data
        });
      }
    });
  }

}
