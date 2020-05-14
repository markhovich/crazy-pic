import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestSingleComponent } from './contest-single/contest-single.component';
import { ContestEditComponent } from './contest-edit/contest-edit.component';

const routes: Routes = [
  { path: '', component: ContestListComponent},
  { path: 'single/:token', component: ContestSingleComponent},
  { path: 'edit/:url', component: ContestEditComponent},
  { path: 'add', component: ContestEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestRoutingModule {}