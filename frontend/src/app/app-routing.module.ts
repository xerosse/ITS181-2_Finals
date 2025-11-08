import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddDogComponent } from './add-dog/add-dog.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminComponent } from './admin/admin.component';
import { AdoptComponent } from './adopt/adopt.component';
import { HomeComponent } from './home/home.component';
import { ShowDogComponent } from './show-dog/show-dog.component';
import { ShowArticleComponent } from './show-article/show-article.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';

const routes: Routes = [
  { path: 'add-dog', component: AddDogComponent },
  { path: 'dog/:id', component: ShowDogComponent},
  { path: 'article/:id', component: ShowArticleComponent},
  { path: 'about-us', component: AboutUsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'adopt', component: AdoptComponent },
  { path: 'news', component: ArticlesPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }