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
      this.articleService.updateArticle(this.selectedArticle.id, this.selectedArticle).subscribe(() => {
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
