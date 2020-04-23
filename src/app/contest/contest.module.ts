import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestSingleComponent } from './contest-single/contest-single.component';
import { ContestRoutingModule } from './contest.routing';
import { ContestEditComponent } from './contest-edit/contest-edit.component';

@NgModule({
  declarations: [ContestListComponent, ContestSingleComponent, ContestEditComponent],
  imports: [
    CommonModule,
    ContestRoutingModule
  ],
  exports: [ContestListComponent, ContestSingleComponent, ContestEditComponent]
})
export class ContestModule { }
