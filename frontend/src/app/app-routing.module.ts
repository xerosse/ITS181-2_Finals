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

const routes: Routes = [
  { path: 'add-dog', component: AddDogComponent },
  { path: 'dog/:id', component: ShowDogComponent},
  { path: 'about-us', component: AboutUsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'adopt', component: AdoptComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }