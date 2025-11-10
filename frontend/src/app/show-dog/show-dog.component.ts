import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Dog } from '../model/dog';
import { DogService } from '../service/dog.service';
import { ApplicationService } from '../service/application.service';
import { Application } from '../model/application';
import { AuthService, LoginResponse } from '../service/auth.service';
import { Account } from '../model/account';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-show-dog',
  templateUrl: './show-dog.component.html',
  styleUrl: './show-dog.component.css'
})
export class ShowDogComponent implements OnInit {
  dog: Dog = new Dog();
  currentUser: Account = new Account();
  app: Application = new Application();

  constructor(
    private route: ActivatedRoute,
    private dogService: DogService,
    private authService: AuthService,
    private accountService: AccountService,
    private applicationService: ApplicationService
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
    this.authService.currentUser$.subscribe(user => {
      const userId = user?.id;

      if (userId !== undefined) {
        // get user account from backend
        this.accountService.getAccount(userId).subscribe((userAccount) => {
          this.currentUser = userAccount;
        });
      }
      
    });
  }

    createApplication() {
      this.app.dog = this.dog;
      this.app.user = this.currentUser;
        
      this.applicationService.addApplication(this.app).subscribe({
        next: (response) => {
          console.log('Application created successfully:', response);
        },
        error: (err) => {
          console.error('Error creating application:', err);
        }
      });
    }

}
