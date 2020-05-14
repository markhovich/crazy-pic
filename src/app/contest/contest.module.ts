import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestSingleComponent } from './contest-single/contest-single.component';
import { ContestRoutingModule } from './contest.routing';
import { ContestEditComponent } from './contest-edit/contest-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PictureModule } from '../picture/picture.module';

@NgModule({
  declarations: [ContestListComponent, ContestSingleComponent, ContestEditComponent],
  imports: [
    CommonModule,
    ContestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PictureModule
  ],
  exports: [ContestListComponent, ContestSingleComponent, ContestEditComponent]
})
export class ContestModule { }
