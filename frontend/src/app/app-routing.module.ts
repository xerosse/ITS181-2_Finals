import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDogComponent } from './add-dog/add-dog.component';

const routes: Routes = [
  { path: 'add-dog', component: AddDogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
