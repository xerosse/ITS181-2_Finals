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
  isLoggedIn: boolean = false;
  isLoadingUser: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private dogService: DogService,
    public authService: AuthService,
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
      console.log('Current user from auth service:', user);
      
      // Check if user is actually logged in
      if (user && user.success === true && user.id) {
        this.isLoggedIn = true;
        console.log('User is logged in, fetching account for ID:', user.id);
        
        // get user account from backend
        this.accountService.getAccount(user.id).subscribe({
          next: (userAccount) => {
            console.log('Loaded user account:', userAccount);
            this.currentUser = userAccount;
            this.isLoadingUser = false;
          },
          error: (err) => {
            console.error('Error loading user account:', err);
            console.error('User might not be authenticated. Clearing login status.');
            this.isLoggedIn = false;
            this.currentUser = new Account();
            this.isLoadingUser = false;
          }
        });
      } else {
        console.log('No user logged in or login failed');
        this.isLoggedIn = false;
        this.currentUser = new Account();
        this.isLoadingUser = false;
      }
    });
  }

  createApplication() {
    console.log('createApplication called');
    console.log('isLoggedIn:', this.isLoggedIn);
    console.log('currentUser:', this.currentUser);
    console.log('currentUser.id:', this.currentUser.id);
    
    // Check if user is logged in
    if (!this.isLoggedIn) {
      alert('Please log in to adopt a dog!');
      return;
    }

    // Wait for user data to load
    if (this.isLoadingUser) {
      alert('Loading user data, please try again in a moment...');
      return;
    }

    // Check if we have the user account data
    if (!this.currentUser || !this.currentUser.id) {
      alert('Error loading user data. Please refresh and try again.');
      return;
    }

    // Check if user is admin
    if (this.authService.isAdmin()) {
      alert('Admins cannot adopt dogs. Please use a regular user account.');
      return;
    }

    console.log('Creating application for user:', this.currentUser.id, 'and dog:', this.dog.id);

    this.app.dog = this.dog;
    this.app.user = this.currentUser;
    this.app.status = 'ONGOING';
    this.app.application_date = new Date();
      
    this.applicationService.addApplication(this.app).subscribe({
      next: (response) => {
        console.log('Application created successfully:', response);
        alert('Application submitted successfully! We will contact you soon.');
      },
      error: (err) => {
        console.error('Error creating application:', err);
        if (err.status === 401) {
          alert('Please log in to adopt a dog!');
        } else if (err.status === 403) {
          alert('You do not have permission to create applications.');
        } else {
          alert('Failed to submit application. Please try again later.');
        }
      }
    });
  }
}
