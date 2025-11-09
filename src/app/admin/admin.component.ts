import { Component, OnInit } from '@angular/core';
import { Dog } from '../model/dog';
import { Account } from '../model/account';
import { Application } from '../model/application';
import { DogService } from '../service/dog.service';
import { AccountService } from '../service/account.service';
import { ApplicationService } from '../service/application.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  activeTab: 'dogs' | 'accounts' | 'applications' = 'dogs';
  
  // Dogs
  dogs: Dog[] = [];
  selectedDog: Dog = new Dog();
  isEditingDog: boolean = false;
  
  // Accounts
  accounts: Account[] = [];
  selectedAccount: Account = new Account();
  isEditingAccount: boolean = false;
  
  // Applications
  applications: Application[] = [];
  selectedApplication: Application = new Application();
  isEditingApplication: boolean = false;

  constructor(
    private dogService: DogService,
    private accountService: AccountService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit() {
    this.loadDogs();
    this.loadAccounts();
    this.loadApplications();
  }

  switchTab(tab: 'dogs' | 'accounts' | 'applications') {
    this.activeTab = tab;
  }

  // Dog CRUD
  loadDogs() {
    this.dogService.getDogs().subscribe(data => this.dogs = data);
  }

  selectDog(dog: Dog) {
    this.selectedDog = { ...dog };
    this.isEditingDog = true;
  }

  newDog() {
    this.selectedDog = new Dog();
    this.isEditingDog = false;
  }

  saveDog() {
    if (this.isEditingDog) {
      this.dogService.updateDog(this.selectedDog.id, this.selectedDog).subscribe(() => {
        this.loadDogs();
        this.newDog();
        alert('Dog updated successfully!');
      });
    } else {
      this.dogService.addDog(this.selectedDog).subscribe(() => {
        this.loadDogs();
        this.newDog();
        alert('Dog added successfully!');
      });
    }
  }

  deleteDog(id: number) {
    if (confirm('Are you sure you want to delete this dog?')) {
      this.dogService.deleteDog(id).subscribe(() => {
        this.loadDogs();
        alert('Dog deleted successfully!');
      });
    }
  }

  addImagePath() {
    if (!Array.isArray(this.selectedDog.image_paths)) {
      this.selectedDog.image_paths = [];
    }
    this.selectedDog.image_paths.push('');
  }

  removeImagePath(index: number) {
    this.selectedDog.image_paths.splice(index, 1);
  }

  // Account CRUD
  loadAccounts() {
    this.accountService.getAccounts().subscribe(data => this.accounts = data);
  }

  selectAccount(account: Account) {
    this.selectedAccount = { ...account };
    this.isEditingAccount = true;
  }

  newAccount() {
    this.selectedAccount = new Account();
    this.isEditingAccount = false;
  }

  saveAccount() {
    if (this.isEditingAccount) {
      this.accountService.updateAccount(this.selectedAccount.id, this.selectedAccount).subscribe(() => {
        this.loadAccounts();
        this.newAccount();
        alert('Account updated successfully!');
      });
    } else {
      this.accountService.addAccount(this.selectedAccount).subscribe(() => {
        this.loadAccounts();
        this.newAccount();
        alert('Account added successfully!');
      });
    }
  }

  deleteAccount(id: number) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(id).subscribe(() => {
        this.loadAccounts();
        alert('Account deleted successfully!');
      });
    }
  }

  // Application CRUD
  loadApplications() {
    this.applicationService.getApplications().subscribe(data => this.applications = data);
  }

  selectApplication(application: Application) {
    this.selectedApplication = { ...application };
    this.isEditingApplication = true;
  }

  newApplication() {
    this.selectedApplication = new Application();
    this.isEditingApplication = false;
  }

  saveApplication() {
    if (this.isEditingApplication) {
      this.applicationService.updateApplication(this.selectedApplication.id, this.selectedApplication).subscribe(() => {
        this.loadApplications();
        this.newApplication();
        alert('Application updated successfully!');
      });
    } else {
      this.applicationService.addApplication(this.selectedApplication).subscribe(() => {
        this.loadApplications();
        this.newApplication();
        alert('Application added successfully!');
      });
    }
  }

  deleteApplication(id: number) {
    if (confirm('Are you sure you want to delete this application?')) {
      this.applicationService.deleteApplication(id).subscribe(() => {
        this.loadApplications();
        alert('Application deleted successfully!');
      });
    }
  }
}
