import { Component, OnInit } from '@angular/core';
import { Dog } from '../model/dog';
import { Account } from '../model/account';
import { Application } from '../model/application';
import { DogService } from '../service/dog.service';
import { AccountService } from '../service/account.service';
import { ApplicationService } from '../service/application.service';
import { ArticleService } from '../service/article.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  activeTab: 'dogs' | 'accounts' | 'applications' | 'articles' = 'dogs';
  
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

  // Articles
  articles: Article[] = [];
  selectedArticle: Article = new Article();
  isEditingArticle: boolean = false;

  constructor(
    private dogService: DogService,
    private accountService: AccountService,
    private applicationService: ApplicationService,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.loadDogs();
    this.loadAccounts();
    this.loadApplications();
    this.loadArticles();
  }

  switchTab(tab: 'dogs' | 'accounts' | 'applications' | 'articles') {
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
    // Initialize image_paths as empty array
    this.selectedDog.image_paths = [];
    this.isEditingDog = false;
  }

  saveDog() {
    console.log('Attempting to save dog:', this.selectedDog);
    
    // Ensure image_paths is at least an empty array
    if (!this.selectedDog.image_paths || this.selectedDog.image_paths.length === 0) {
      this.selectedDog.image_paths = [''];
    }

    if (this.isEditingDog) {
      this.dogService.updateDog(this.selectedDog.id!, this.selectedDog).subscribe({
        next: (response) => {
          console.log('Dog updated successfully:', response);
          this.loadDogs();
          this.newDog();
          alert('Dog updated successfully!');
        },
        error: (error) => {
          console.error('Full error object:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          alert('Failed to update dog: ' + (error.error?.message || error.message || 'Unknown error'));
        }
      });
    } else {
      console.log('Calling addDog service...');
      this.dogService.addDog(this.selectedDog).subscribe({
        next: (response) => {
          console.log('Dog added successfully:', response);
          this.loadDogs();
          this.newDog();
          alert('Dog added successfully!');
        },
        error: (error) => {
          console.error('Full error object:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          console.error('Error headers:', error.headers);
          
          let errorMsg = 'Failed to add dog. ';
          if (error.status === 0) {
            errorMsg += 'Cannot connect to server. Make sure the backend is running on http://localhost:18080';
          } else {
            errorMsg += (error.error?.message || error.message || 'Unknown error');
          }
          alert(errorMsg);
        }
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
    // Validate password for new accounts
    if (!this.isEditingAccount && (!this.selectedAccount.password || this.selectedAccount.password.length < 6)) {
      alert('Password must be at least 6 characters');
      return;
    }

    if (this.isEditingAccount) {
      this.accountService.updateAccount(this.selectedAccount.id, this.selectedAccount).subscribe({
        next: () => {
          this.loadAccounts();
          this.newAccount();
          alert('Account updated successfully!');
        },
        error: (error) => {
          console.error('Error updating account:', error);
          alert('Failed to update account: ' + (error.error?.message || error.message || 'Unknown error'));
        }
      });
    } else {
      this.accountService.addAccount(this.selectedAccount).subscribe({
        next: () => {
          this.loadAccounts();
          this.newAccount();
          alert('Account added successfully!');
        },
        error: (error) => {
          console.error('Error adding account:', error);
          alert('Failed to add account: ' + (error.error?.message || error.message || 'Unknown error'));
        }
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
      // handle dog status change
      if (this.selectedApplication.status === "COMPLETE" ) {
        this.selectedDog = this.selectedApplication.dog;
        this.selectedDog.status = "ADOPTED";
        this.selectedDog.adopted_date = new Date();
        this.saveDog();
      }

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

  // Article CRUD
  loadArticles() {
    this.articleService.getArticles().subscribe(data => this.articles = data);
  }

  selectArticle(article: Article) {
    this.selectedArticle = { ...article };
    this.isEditingArticle = true;
  }

  newArticle() {
    this.selectedArticle = new Article();
    this.isEditingArticle = false;
  }

  saveArticle() {
    if (this.isEditingArticle) {
      this.articleService.updateArticle(this.selectedArticle.id!, this.selectedArticle).subscribe(() => {
        this.loadArticles();
        this.newArticle();
        alert('Article updated successfully!');
      });
    } else {
      this.articleService.addArticle(this.selectedArticle).subscribe(() => {
        this.loadArticles();
        this.newArticle();
        alert('Article added successfully!');
      });
    }
  }

  deleteArticle(id: number) {
    if (confirm('Are you sure you want to delete this article?')) {
      this.articleService.deleteArticle(id).subscribe(() => {
        this.loadArticles();
        alert('Article deleted successfully!');
      });
    }
  }
}
