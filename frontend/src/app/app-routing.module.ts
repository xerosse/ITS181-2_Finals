import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddDogComponent } from './add-dog/add-dog.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'add-dog', component: AddDogComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }