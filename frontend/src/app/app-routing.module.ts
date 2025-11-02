import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDogComponent } from './add-dog/add-dog.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'add-dog', component: AddDogComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/about-us', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }